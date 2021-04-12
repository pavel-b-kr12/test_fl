/*
 * ESP8266 MQTT Lights for Home Assistant.
 *
 * Created DIY lights for Home Assistant using MQTT and JSON.
 * This project supports single-color, RGB, and RGBW lights.
 *
 * See https://github.com/corbanmailloux/esp-mqtt-rgb-led for more information.
 */
#define disableW

// Set configuration options for LED type, pins, WiFi, and MQTT in the following file:
#include "config.h"
long idle_mode_start_t=2000; // 0 is off idle mode for now, -1 off forever

// https://github.com/bblanchon/ArduinoJson
#include <ArduinoJson.h>

#include <ESP8266WiFi.h>

// http://pubsubclient.knolleary.net/
#include <PubSubClient.h>

int user_active=0;
long user_endSes_t=0;

const bool rgb = (CONFIG_STRIP == RGB) || (CONFIG_STRIP == RGBW);
const bool includeWhite = (CONFIG_STRIP == BRIGHTNESS) || (CONFIG_STRIP == RGBW);

const int BUFFER_SIZE = JSON_OBJECT_SIZE(22);//TODO
//This process is cumbersome and error-prone, that’s why there is a tool for that: the ArduinoJson Assistant. paste your JSON document and it will return the buffer size.

// Maintained state for reporting to MQTT
byte red = 255;
byte green = 255;
byte blue = 255;
byte white = 255;
byte brightness = 255;

// Real values to write to the LEDs (ex. including brightness and state)
byte realRed = 0;
byte realGreen = 0;
byte realBlue = 0;
byte realWhite = 0;

#define idle_mode_W_color	255  	//ifdef includeWhite
#define idle_mode_RGB_color	0 		//ifdef includeWhite
#define idle_mode_RGB_color_no_w	122  //if not def includeWhite

bool stateOn = false;

// Globals for fade/transitions
bool startFade = false;
unsigned long lastLoop = 0;
int transitionTime = 0;
bool inFade = false;
int loopCount = 0;
int stepR, stepG, stepB, stepW;
int redVal, grnVal, bluVal, whtVal;

// Globals for flash
bool flash = false;
bool startFlash = false;
int flashLength = 0;
unsigned long flashStartTime = 0;
byte flashRed = red;
byte flashGreen = green;
byte flashBlue = blue;
byte flashWhite = white;
byte flashBrightness = brightness;

// Globals for colorfade
bool colorfade = false;
int currentColor = 0;
// {red, grn, blu, wht}
const byte colors[][4] = {
  {255, 0, 0, 0},
  {0, 255, 0, 0},
  {0, 0, 255, 0},
  {255, 80, 0, 0},
  {163, 0, 255, 0},
  {0, 255, 255, 0},
  {255, 255, 0, 0}
};
const int numColors = 7;

// Must be unique on the MQTT network
char MQTTclientID[32];

WiFiClient espClient;
PubSubClient client(espClient);

#define ttab	Serial.print("\t");

void setup() {
  if (rgb) {
    pinMode(CONFIG_PIN_RED, OUTPUT);
    pinMode(CONFIG_PIN_GREEN, OUTPUT);
    pinMode(CONFIG_PIN_BLUE, OUTPUT);
  }
  if (includeWhite) {
    pinMode(CONFIG_PIN_WHITE, OUTPUT);
  }

#ifdef CONFIG_LED_BUILTIN_MODE
  // Set the LED_BUILTIN based on the CONFIG_LED_BUILTIN_MODE
  switch (CONFIG_LED_BUILTIN_MODE) {
    case 0:
      pinMode(LED_BUILTIN, OUTPUT);
      digitalWrite(LED_BUILTIN, LOW);
      break;
    case 1:
      pinMode(LED_BUILTIN, OUTPUT);
      digitalWrite(LED_BUILTIN, HIGH);
      break;
    default: // Other options (like -1) are ignored.
      break;
  }
#endif

  analogWriteRange(255);

  #ifdef CONFIG_DEBUG
    Serial.begin(115200);
  #endif

  setup_wifi();
  getMQTTclientID().toCharArray(MQTTclientID, 32);//??
   #ifdef CONFIG_DEBUG
   Serial.print("clientID: "); Serial.println(MQTTclientID);
   #endif
   
  client.setServer(CONFIG_MQTT_HOST, CONFIG_MQTT_PORT);
  client.setCallback(callback);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
	#ifdef CONFIG_DEBUG
	Serial.println();
	Serial.print("Connecting to ");
	Serial.println(CONFIG_WIFI_SSID);
	#endif
  WiFi.mode(WIFI_STA); // Disable the built-in WiFi access point.
  WiFi.begin(CONFIG_WIFI_SSID, CONFIG_WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
	#ifdef CONFIG_DEBUG
    Serial.print(".");
	#endif
  }
#ifdef CONFIG_DEBUG
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  //Serial.print("MAC address: ");
  //Serial.println(getMacAddress());
  #endif
}

  /*
  SAMPLE PAYLOAD (BRIGHTNESS):
    {
      "brightness": 120,
      "flash": 2,
      "transition": 5,
      "state": "ON"
    }

  SAMPLE PAYLOAD (RGBW):
    {
      "brightness": 120,
      "color": {
        "r": 255,
        "g": 100,
        "b": 100
      },
      "white_value": 255,
      "flash": 2,
      "transition": 5,
      "state": "ON",
      "effect": "colorfade_fast",
      "endSes_d": 60,
      "idle_d": 30
    }
  */
void callback(char* topic, byte* payload, unsigned int length) {
#ifdef CONFIG_DEBUG
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
#endif
  char message[length + 1];
  for (int i = 0; i < length; i++) {
    message[i] = (char)payload[i];
  }
  message[length] = '\0';
#ifdef CONFIG_DEBUG
  Serial.println(message);
#endif
  if (!processJson(message)) {
    return;
  }

  if (stateOn) {
    // Update lights
    realRed = map(red, 0, 255, 0, brightness);
    realGreen = map(green, 0, 255, 0, brightness);
    realBlue = map(blue, 0, 255, 0, brightness);
    realWhite = map(white, 0, 255, 0, brightness);
  }
  else {
    realRed = 0;
    realGreen = 0;
    realBlue = 0;
    realWhite = 0;
  }
  	if(idle_mode_start_t>=0)
		idle_mode_start_t=millis()+idle_d;

  startFade = true;
  inFade = false; // Kill the current fade

  sendState();
}


bool processJson(char* message) {
  StaticJsonBuffer<BUFFER_SIZE> jsonBuffer;

  JsonObject& root = jsonBuffer.parseObject(message);

  if (!root.success()) {
    Serial.println("parseObject() failed");
    return false;
  }
  
  if (root.containsKey("endSes_d")) {
	endSes_d=(int)root["endSes_d"];
	endSes_d*=1000;
	if(endSes_d<10000) endSes_d=10000;
	else
	if(endSes_d>endSes_dM) endSes_d=endSes_dM;	
  }  
  if (root.containsKey("idle_d")) {
	idle_d=(int)root["idle_d"];
	idle_d*=1000;
	if(idle_d<10000) idle_d=10000;
	else
	if(idle_d>idle_dM) idle_d=idle_dM;	
  }  
  if (root.containsKey("multiplayer")) {
	multiplayer=(int)root["multiplayer"];
	switch(multiplayer)
	{
		case 0: break; //only active user can set color. Send active user id to server. Other users - will block html control
		case 1: break; //all together
		case 7: break;//set 1 flower, but each click - different
		default: multiplayer=0; break;
	}
  }

//random change TODO2 use fade, flash 
  if (root.containsKey("effect") && strcmp(root["effect"], "rnd") == 0) {
		   effN=EFF_RND;
	   }
	else
  if (root.containsKey("effect") && strcmp(root["effect"], "fade_all_but_1") == 0) {
		   effN=EFF_fade_all_but_single_colored;
	   }
	   else effN=0; //switch to default
	   
  //============================= active user control or ret
  if (root.containsKey("user_id")) {
	#ifdef CONFIG_DEBUG
	  Serial.print("user_id "); ttab
	  //Serial.print((String)root["user_id"]);ttab
	  Serial.print((int)root["user_id"]);ttab
	  Serial.print(user_active);
	  Serial.println();
	#endif
	if(user_active==0)
	{
		user_active=(int)root["user_id"];
		user_endSes_t=millis()+endSes_d;
		Serial.println(user_active);
	}
	else
		if(multiplayer==0 && user_active!=(int)root["user_id"]) return false;
  }


  if (root.containsKey("state")) {
    if (strcmp(root["state"], CONFIG_MQTT_PAYLOAD_ON) == 0) {
      stateOn = true;
    }
    else if (strcmp(root["state"], CONFIG_MQTT_PAYLOAD_OFF) == 0) {
      stateOn = false;
    }
  }


	   

  // If "flash" is included, treat RGB and brightness differently
  if (root.containsKey("flash") ||
       (root.containsKey("effect") && strcmp(root["effect"], "flash") == 0)) {

    if (root.containsKey("flash")) {
      flashLength = (int)root["flash"] * 1000;
    }
    else {
      flashLength = CONFIG_DEFAULT_FLASH_LENGTH * 1000;
    }

    if (root.containsKey("brightness")) {
      flashBrightness = root["brightness"];
    }
    else {
      flashBrightness = brightness;
    }

    if (rgb && root.containsKey("color")) {
      flashRed = root["color"]["r"];
      flashGreen = root["color"]["g"];
      flashBlue = root["color"]["b"];
    }
    else {
      flashRed = red;
      flashGreen = green;
      flashBlue = blue;
    }

    if (includeWhite && root.containsKey("white_value")) {
      flashWhite = root["white_value"];
    }
    else {
      flashWhite = white;
    }

    flashRed = map(flashRed, 0, 255, 0, flashBrightness);
    flashGreen = map(flashGreen, 0, 255, 0, flashBrightness);
    flashBlue = map(flashBlue, 0, 255, 0, flashBrightness);
    flashWhite = map(flashWhite, 0, 255, 0, flashBrightness);

    flash = true;
    startFlash = true;
  }
  else if (rgb && root.containsKey("effect") &&
      (strcmp(root["effect"], "colorfade_slow") == 0 || strcmp(root["effect"], "colorfade_fast") == 0)) {
    flash = false;
    colorfade = true;
    currentColor = 0;
    if (strcmp(root["effect"], "colorfade_slow") == 0) {
      transitionTime = CONFIG_COLORFADE_TIME_SLOW;
    }
    else {
      transitionTime = CONFIG_COLORFADE_TIME_FAST;
    }
  }
  else if (colorfade && !root.containsKey("color") && root.containsKey("brightness")) {
    // Adjust brightness during colorfade
    // (will be applied when fading to the next color)
    brightness = root["brightness"];
  }
  else { // No effect
    flash = false;
    colorfade = false;

    if (rgb && root.containsKey("color")) {
      red = root["color"]["r"];
      green = root["color"]["g"];
      blue = root["color"]["b"];
    }

    if (includeWhite && root.containsKey("white_value")) {
      white = root["white_value"];
    }
	else white=0;

    if (root.containsKey("brightness")) {
      brightness = root["brightness"];
    }

    if (root.containsKey("transition")) {
      transitionTime = root["transition"];
    }
    else {
      transitionTime = CONFIG_DEFAULT_TRANSITION_TIME;
    }
  }

  return true;
}

long renew_t=20000;
void sendState() {
	renew_t=millis()+10000+random(1000,2000);
  StaticJsonBuffer<BUFFER_SIZE> jsonBuffer;

  JsonObject& root = jsonBuffer.createObject();

  root["state"] = (stateOn) ? CONFIG_MQTT_PAYLOAD_ON : CONFIG_MQTT_PAYLOAD_OFF;
  if (rgb) {
    JsonObject& color = root.createNestedObject("color");
    color["r"] = red;
    color["g"] = green;
    color["b"] = blue;
  }

  root["user_active"] = user_active;
  root["multiplayer"] = multiplayer;
  
  root["brightness"] = brightness;

  if (includeWhite) {
    root["white_value"] = white;
  }

  if (rgb && colorfade) {
    if (transitionTime == CONFIG_COLORFADE_TIME_SLOW) {
      root["effect"] = "colorfade_slow";
    }
    else {
      root["effect"] = "colorfade_fast";
    }
  }
  else {
    root["effect"] = "null";
  }

  char buffer[root.measureLength() + 1];
  root.printTo(buffer, sizeof(buffer));

  client.publish(CONFIG_MQTT_TOPIC_STATE, buffer, true);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
   #ifdef CONFIG_DEBUG
    Serial.print("Attempting MQTT connection with ID: ");
    Serial.println(MQTTclientID);
	 #endif
    // Attempt to connect
    if (client.connect(MQTTclientID, CONFIG_MQTT_USER, CONFIG_MQTT_PASS)) {
		 #ifdef CONFIG_DEBUG
      Serial.println("connected");
	   #endif
      client.subscribe(CONFIG_MQTT_TOPIC_SET);
    } else {
		 #ifdef CONFIG_DEBUG
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
	  #endif
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
	 
void setColor(int inR, int inG, int inB, int inW) {
  if (CONFIG_INVERT_LED_LOGIC) {
    inR = (255 - inR);
    inG = (255 - inG);
    inB = (255 - inB);
    inW = (255 - inW);
  }

  if (rgb) {
    analogWrite(CONFIG_PIN_RED, inR);
    analogWrite(CONFIG_PIN_GREEN, inG);
    analogWrite(CONFIG_PIN_BLUE, inB);
  }

		#ifdef disableW

		#else
  if (includeWhite) {
    analogWrite(CONFIG_PIN_WHITE, inW);
  }
		#endif


  #ifdef CONFIG_DEBUG
    Serial.print("Setting LEDs: {");
    if (rgb) {
      Serial.print("r: ");
      Serial.print(inR);
      Serial.print(" , g: ");
      Serial.print(inG);
      Serial.print(" , b: ");
      Serial.print(inB);
    }

    if (includeWhite) {
      if (rgb) {
        Serial.print(", ");
      }
      Serial.print("w: ");
      Serial.print(inW);
    }

    Serial.println("}");
  #endif
}

#ifdef EFF_RND
long nextRandom_change_t=1000;

int v3=0,v3_old=0, v3_target=0;
long v3_anim_start_t,v3_anim_end_t=0;

int v5=0,v5_old=0, v5_target=0;
long v5_anim_start_t,v5_anim_end_t=0;

int v6=0,v6_old=0, v6_target=0;
long v6_anim_start_t,v6_anim_end_t=0;

int v7=0,v7_old=0, v7_target=0;
long v7_anim_start_t,v7_anim_end_t=0;
#endif



void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();
  
  if(millis()>renew_t) sendState();
  
  	if(user_active!=0 && (millis()>user_endSes_t || idle_mode_start_t==0) )
	{ //user_active session end, kick him
		user_active=0;	sendState();
	}
  if(idle_mode_start_t>0 && millis()>idle_mode_start_t) //idle mode = white color //TODO anim black, delay(2000), fade to White
  { //start of idle mode (white color)
	  user_active=0;  sendState();
	  
	idle_mode_start_t=0;
	  
	if(includeWhite)
	{
	 setColor(idle_mode_RGB_color,idle_mode_RGB_color,idle_mode_RGB_color,idle_mode_W_color);
	 #ifdef disableW
	 analogWrite(CONFIG_PIN_WHITE, idle_mode_W_color);
	 #endif
	}
	else
	 setColor(idle_mode_RGB_color_no_w,idle_mode_RGB_color_no_w,idle_mode_RGB_color_no_w,0);
  }
  else
  {
	#ifdef EFF_RND
	if(effN==EFF_RND)
	{
	
	if(millis()<v3_anim_end_t)
	{
		v3=map(millis(), v3_anim_start_t, v3_anim_end_t, v3_old, v3_target);
	}
	else 
	{
		v3_old=v3_target;
		v3=v3_target;
		
		if(millis()>nextRandom_change_t && random(0,10)>3)
		{
			nextRandom_change_t=millis()+random(1000,4000);
			v3_anim_start_t=millis();
			v3_anim_end_t=millis()+random(500,3000);

			v3_target=random(0,1023);
			// Serial.print(D5);ttab Serial.println(v5_target);
		}
	}
	
	if(millis()<v5_anim_end_t)
	{
		v5=map(millis(), v5_anim_start_t, v5_anim_end_t, v5_old, v5_target);
	}
	else 
	{
		v5_old=v5_target;
		v5=v5_target;
		if(millis()>nextRandom_change_t && random(0,10)>3)
		{
			nextRandom_change_t=millis()+random(1000,4000);
			v5_anim_start_t=millis();
			v5_anim_end_t=millis()+random(500,3000);

			v5_target=random(0,1023);
			// Serial.print(D5);ttab Serial.println(v5_target);
		}
	}
	
	if(millis()<v6_anim_end_t)
	{
		v6=map(millis(), v6_anim_start_t, v6_anim_end_t, v6_old, v6_target);
	}
	else 
	{
		v6_old=v6_target;
		v6=v6_target;
		if(millis()>nextRandom_change_t && random(0,10)>3)
		{
			nextRandom_change_t=millis()+random(1000,4000);
			v6_anim_start_t=millis();
			v6_anim_end_t=millis()+random(500,3000);

			v6_target=random(0,1023);
			// Serial.print(D5);ttab Serial.println(v5_target);
		}
	}
	
	if(millis()<v7_anim_end_t)
	{
		v7=map(millis(), v7_anim_start_t, v7_anim_end_t, v7_old, v7_target);
	}
	else 
	{
		v7_old=v7_target;
		v7=v7_target;
		if(millis()>nextRandom_change_t && random(0,10)>3)
		{
			nextRandom_change_t=millis()+random(1000,4000);
			v7_anim_start_t=millis();
			v7_anim_end_t=millis()+random(500,3000);

			v7_target=random(0,1023);
			// Serial.print(D5);ttab Serial.println(v5_target);
		}
	}
	
	setColor(v5, v6, v7, v3);

	
	}
	else
	#endif
	#ifdef EFF_fade_all_but_single_colored
	if(effN==EFF_fade_all_but_single_colored)
	{
		int eff_stage=millis()%30000;
		if(eff_stage<2000) //fade from initial to random color
		{
			if(bChooseNewColor)
			{
				cw=random(0,99);
				cr=random(0,255);
				cg=random(0,255);
				cb=random(0,255);
			}
			v5=map(eff_stage, 0,2000, idle_mode_RGB_color, cr);
			v6=map(eff_stage, 0,2000, idle_mode_RGB_color, cg);
			v7=map(eff_stage, 0,2000, idle_mode_RGB_color, cb);
			v3=map(eff_stage, 0,2000, idle_mode_W_color, cw);
			setColor(v5, v6, v7, v3);
			//setColor(v5,idle_mode_RGB_color,idle_mode_RGB_color,idle_mode_W_color);
		}
		else
			if(eff_stage<6000) //hold
			{
				//setColor(v5, v6, v7, v3);
			}
		else
		if(eff_stage<9000) //fade to initial 
		{
			bChooseNewColor=true;
			if(bChooseNewColor)
			{
				cw=random(0,99);
				cr=random(0,255);
				cg=random(0,255);
				cb=random(0,255);
			}
			v5=map(eff_stage, 9000,6000, idle_mode_RGB_color, cr);
			v6=map(eff_stage, 9000,6000, idle_mode_RGB_color, cg);
			v7=map(eff_stage, 9000,6000, idle_mode_RGB_color, cb);
			v3=map(eff_stage, 9000,6000, idle_mode_W_color, cw);
			setColor(v5, v6, v7, v3);
			//setColor(v5,idle_mode_RGB_color,idle_mode_RGB_color,idle_mode_W_color);
		}
			
	}
	else
	#endif
	{
  if (flash) {
    if (startFlash) {
      startFlash = false;
      flashStartTime = millis();
    }

    if ((millis() - flashStartTime) <= flashLength) {
      if ((millis() - flashStartTime) % 1000 <= 500) {
		#ifdef disableW
			setColor(flashRed, flashGreen, flashBlue, 0);
		#else
			setColor(flashRed, flashGreen, flashBlue, flashWhite);
		#endif
      }
      else {
        setColor(0, 0, 0, 0);
        // If you'd prefer the flashing to happen "on top of"
        // the current color, uncomment the next line.
        // setColor(realRed, realGreen, realBlue, realWhite);
      }
    }
    else {
      flash = false;
	  	#ifdef disableW
			setColor(realRed, realGreen, realBlue, 0);
		#else
			setColor(realRed, realGreen, realBlue, realWhite);
		#endif
    
    }
  }
  else if (rgb && colorfade && !inFade) {
    realRed = map(colors[currentColor][0], 0, 255, 0, brightness);
    realGreen = map(colors[currentColor][1], 0, 255, 0, brightness);
    realBlue = map(colors[currentColor][2], 0, 255, 0, brightness);
    realWhite = map(colors[currentColor][3], 0, 255, 0, brightness);
    currentColor = (currentColor + 1) % numColors;
    startFade = true;
  }

  if (startFade) {
    // If we don't want to fade, skip it.
    if (transitionTime == 0) {
		#ifdef disableW
			setColor(realRed, realGreen, realBlue, 0);
		#else
			setColor(realRed, realGreen, realBlue, realWhite);
		#endif
      

      redVal = realRed;
      grnVal = realGreen;
      bluVal = realBlue;
      whtVal = realWhite;

      startFade = false;
    }
    else {
      loopCount = 0;
      stepR = calculateStep(redVal, realRed);
      stepG = calculateStep(grnVal, realGreen);
      stepB = calculateStep(bluVal, realBlue);
      stepW = calculateStep(whtVal, realWhite);

      inFade = true;
    }
  }

  if (inFade) {
    startFade = false;
    unsigned long now = millis();
    if (now - lastLoop > transitionTime) {
      if (loopCount <= 1020) {
        lastLoop = now;

        redVal = calculateVal(stepR, redVal, loopCount);
        grnVal = calculateVal(stepG, grnVal, loopCount);
        bluVal = calculateVal(stepB, bluVal, loopCount);
       
		#ifdef disableW
			setColor(redVal, grnVal, bluVal, 0); // Write current values to LED pins
		#else
			whtVal = calculateVal(stepW, whtVal, loopCount);
			setColor(redVal, grnVal, bluVal, whtVal); // Write current values to LED pins
		#endif

#ifdef CONFIG_DEBUG
        Serial.print("Loop count: ");
        Serial.println(loopCount);
#endif
        loopCount++;
      }
      else {
        inFade = false;
      }
    }
  }
	}
  }
}

// From https://www.arduino.cc/en/Tutorial/ColorCrossfader
/* BELOW THIS LINE IS THE MATH -- YOU SHOULDN'T NEED TO CHANGE THIS FOR THE BASICS
*
* The program works like this:
* Imagine a crossfade that moves the red LED from 0-10,
*   the green from 0-5, and the blue from 10 to 7, in
*   ten steps.
*   We'd want to count the 10 steps and increase or
*   decrease color values in evenly stepped increments.
*   Imagine a + indicates raising a value by 1, and a -
*   equals lowering it. Our 10 step fade would look like:
*
*   1 2 3 4 5 6 7 8 9 10
* R + + + + + + + + + +
* G   +   +   +   +   +
* B     -     -     -
*
* The red rises from 0 to 10 in ten steps, the green from
* 0-5 in 5 steps, and the blue falls from 10 to 7 in three steps.
*
* In the real program, the color percentages are converted to
* 0-255 values, and there are 1020 steps (255*4).
*
* To figure out how big a step there should be between one up- or
* down-tick of one of the LED values, we call calculateStep(),
* which calculates the absolute gap between the start and end values,
* and then divides that gap by 1020 to determine the size of the step
* between adjustments in the value.
*/
int calculateStep(int prevValue, int endValue) {
    int step = endValue - prevValue; // What's the overall gap?
    if (step) {                      // If its non-zero,
        step = 1020/step;            //   divide by 1020
    }

    return step;
}

/* The next function is calculateVal. When the loop value, i,
*  reaches the step size appropriate for one of the
*  colors, it increases or decreases the value of that color by 1.
*  (R, G, and B are each calculated separately.)
*/
int calculateVal(int step, int val, int i) {
    if ((step) && i % step == 0) { // If step is non-zero and its time to change a value,
        if (step > 0) {              //   increment the value if step is positive...
            val += 1;
        }
        else if (step < 0) {         //   ...or decrement it if step is negative
            val -= 1;
        }
    }

    // Defensive driving: make sure val stays in the range 0-255
    if (val > 255) {
        val = 255;
    }
    else if (val < 0) {
        val = 0;
    }

    return val;
}

String getMQTTclientID() {
  byte mac[6];
  WiFi.macAddress(mac);
  String clientID = CONFIG_MQTT_CLIENT_ID_PREFIX;
  for (int i = 0; i < 6; ++i) {
    if (mac[i]<0x10) {clientID += "0";}
    clientID += String(mac[i],HEX);
    if(i<5)
    clientID += ""; // put : or - if you want byte delimiters
  }
  clientID.toUpperCase();
  return clientID;
}