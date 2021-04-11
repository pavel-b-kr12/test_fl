import mqtt from 'mqtt';

const MQTT_TOPIC_SUBSCRIBE = 'flowers/ESP_LED';
const MQTT_TOPIC_PUBLISH = 'flowers/ESP_LED/set';
const DEFAULT_COLOR_MESSAGE = '{"state": "ON","brightness": 120,"color": {"r": 255,"g": 255,"b": 255},"transition": 2}';
const DEFAULT_COLOR_TIMEOUT = 300000 // 300000 ms = 5 min

class DefaultColorHandler {
  constructor() {
    this.mqttClient = null;
    this.broker_url = process.env.MQTT_BROKER_URL || 'mqtt://127.0.0.1';
    this.username = process.env.MQTT_USER || ''; // mqtt credentials if these are needed to connect
    this.password = process.env.MQTT_PASSWORD || '';
  }
  
  start() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.broker_url, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log('mqtt client error');
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', async () => {
      console.log(`mqtt client connected and waiting for ${DEFAULT_COLOR_TIMEOUT} ms`);
      await sleep(DEFAULT_COLOR_TIMEOUT);
      this.mqttClient.publish(MQTT_TOPIC_PUBLISH, DEFAULT_COLOR_MESSAGE, {retain: true});
      console.log('mqtt client set color as default value');
      this.mqttClient.end();
    });

    this.mqttClient.on('reconnect', () => {
      console.log(`mqtt client reconnecting...`);
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default DefaultColorHandler;