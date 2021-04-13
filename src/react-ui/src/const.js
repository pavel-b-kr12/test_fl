export const MQTT_TOPIC_SUBSCRIBE = 'flowers/ESP_LED';
export const MQTT_TOPIC_PUBLISH = 'flowers/ESP_LED/set';

//export const GAME_TIME_PLAY = Number.parseInt(process.env.REACT_APP_GAME_TIME_PLAY) || 60; //send MQTT as 'endSes_d'
export const GAME_TIME_PLAY = 60; //send MQTT as 'endSes_d'
export const idle_d = 30; //send MQTT as 'idle_d'

export const COLORS = {
  'rgb(255, 100, 0)': { "r": 255, "g": 100, "b": 0 }, // orange
  'rgb(255, 20, 147)': { "r": 255, "g": 20, "b": 147 }, // pink
  'rgb(200, 0, 255)': { "r": 200, "g": 0, "b": 255 }, // violet
  'rgb(0, 255, 255)': { "r": 0, "g": 255, "b": 255 }, // aqua
  'rgb(0, 225, 0)': { "r": 0, "g": 225, "b": 0 }, // green
  'rgb(255, 255, 0)': { "r": 255, "g": 255, "b": 0 } // yellow
};

export const FAKE_COLORS = {
  'rgb(255, 100, 0)': 'rgb(251, 206, 91)',
  'rgb(255, 20, 147)': 'rgb(248, 184, 211)',
  'rgb(200, 0, 255)': 'rgb(186, 111, 168)',
  'rgb(0, 255, 255)': 'rgb(162, 218, 219)',
  'rgb(0, 225, 0)': 'rgb(213, 226, 116)',
  'rgb(255, 255, 0)': 'rgb(255, 248, 161)'
}

export const COLOR_DEFAULT = 'rgb(255, 255, 255)';

export var user_id = parseInt(localStorage.getItem('user_id'));
if(!user_id)
{
	user_id=Math.floor(Math.random()*100000);
	localStorage.setItem('user_id',user_id);
}
