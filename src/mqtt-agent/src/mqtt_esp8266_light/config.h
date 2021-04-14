// Enables Serial and print statements
#define CONFIG_DEBUG

#define use_pinD3

long endSes_d=60000;
long idle_d=30000;
#define endSes_dM	180000 //limit
#define idle_dM		180000 //limit

int multiplayer=0;

int effN=0;
#define EFF_RND	9
#define EFF_fade_all_but_single_colored	11
byte cw, cr,cg,cb;
bool bChooseNewColor=true;


/* https://github.com/corbanmailloux/esp-mqtt-rgb-led
 * This is a sample configuration file for the "mqtt_esp8266" light.
 *
 * Change the settings below and save the file as "config.h"
 * You can then upload the code using the Arduino IDE.
 */

// Leave this here. These are the choices for CONFIG_STRIP below.
enum strip {
  BRIGHTNESS, // only one color/only white
  RGB,        // RGB LEDs
  RGBW        // RGB LEDs with an extra white LED per LED
};

#define CONFIG_STRIP RGBW // Choose one of the options from above.

// Pins
// In case of BRIGHTNESS: only WHITE is used
// In case of RGB(W): red, green, blue(, white) is used
// All values need to be present, if they are not needed, set to -1,
// it will be ignored.
#define CONFIG_PIN_RED   14  // For RGB(W)
#define CONFIG_PIN_GREEN 12  // For RGB(W)
#define CONFIG_PIN_BLUE  13  // For RGB(W)
#ifdef use_pinD3
#define CONFIG_PIN_WHITE 0 // For BRIGHTNESS and RGBW
#else
#define CONFIG_PIN_WHITE 15  // For BRIGHTNESS and RGBW
#endif
// WiFi
#define CONFIG_WIFI_SSID "TSUM_FlowersHub"
#define CONFIG_WIFI_PASS NULL

// MQTT
#define CONFIG_MQTT_HOST "10.42.0.1"
#define CONFIG_MQTT_PORT 8883 // Usually 1883
#define CONFIG_MQTT_USER "esp_led"
#define CONFIG_MQTT_PASS "1q2w3e4r"
#define CONFIG_MQTT_CLIENT_ID_PREFIX String("ESP_LED_")
#define CONFIG_MQTT_CLIENT_ID "ESP_LED"
#define CONFIG_DEFAULT_TRANSITION_TIME 1

// MQTT Topics
#define CONFIG_MQTT_TOPIC_STATE "flowers/ESP_LED"
#define CONFIG_MQTT_TOPIC_SET "flowers/ESP_LED/set"

#define CONFIG_MQTT_PAYLOAD_ON "ON"
#define CONFIG_MQTT_PAYLOAD_OFF "OFF"

// Miscellaneous
// Default number of flashes if no value was given
#define CONFIG_DEFAULT_FLASH_LENGTH 2
// Number of seconds for one transition in colorfade mode
#define CONFIG_COLORFADE_TIME_SLOW 10
#define CONFIG_COLORFADE_TIME_FAST 3

// Reverse the LED logic
// false: 0 (off) - 255 (bright)
// true: 255 (off) - 0 (bright)
#define CONFIG_INVERT_LED_LOGIC false

// Set the mode for the built-in LED on some boards.
// -1 = Do nothing. Leave the pin in its default state.
//  0 = Explicitly set the LED_BUILTIN to LOW.
//  1 = Explicitly set the LED_BUILTIN to HIGH. (Off for Wemos D1 Mini)
//#define CONFIG_LED_BUILTIN_MODE -1

