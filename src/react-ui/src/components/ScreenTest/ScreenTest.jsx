import React, { useState, useEffect } from 'react';

import { MQTT_TOPIC_PUBLISH, GAME_TIME_PLAY, idle_d, user_id } from '../../const';
import { generateMessage, generateMessageTest } from '../../utils';

import './styles.css';
import timerBg from '../../assets/timer-bg.svg';

import CountDownTimer from '../CountDownTimer';

export const ScreenTest = ({ mqtt, data }) => {
  const onSelectEff = effNm => {
	  let req= generateMessageTest('{ "r": 99, "g": 0, "b": 0 }', user_id, GAME_TIME_PLAY, idle_d, effNm);
	  console.log(effNm,req);
    mqtt.publish(
      MQTT_TOPIC_PUBLISH,
      req
    );
    //setActiveColor(color);
  };
  const onSetC = (r,g,b) => {
	  let req= generateMessage(`{ "r": ${r}, "g": ${g}, "b": ${b} }`, user_id, GAME_TIME_PLAY, idle_d);
	  console.log(req);
    mqtt.publish(
      MQTT_TOPIC_PUBLISH,
      req
    );
  };
  
const getCountdown = () => {
	let now_t = new Date().getTime();
	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
	//console.log(!gm_active_till_t, now_t)
	let s='user'+user_id+': '+(gm_active_till_t?(Math.round((gm_active_till_t - now_t) / 1000)):'?');
	s+='  '+data[0];
	if(data[0])	s+='  '+data[0].user_active;
	return  s;
}
const [countdown_t, setCountdown] = useState(getCountdown());
useEffect(() => {
  const timer = setInterval(() => {
    setCountdown(getCountdown());
  }, 1000);
  return () => clearInterval(timer);
});
//, [countdown_t]);


  return (
  <section className='locked-screen'>
    <p className='locked-info'></p>
    <p ></p>
	<button onClick={() => onSelectEff('rnd')}>rnd</button>
	<button onClick={() => onSelectEff('fade_all_but_1')}>fade_all_but_1</button>
	<button onClick={() => onSelectEff('blink_1')}>blink_1 (TODO)</button>
	<button onClick={() => onSelectEff('epileptogen')}>epileptogen (TODO)</button>
	<button onClick={() => onSetC(255,0,0)}>R</button>
	<button onClick={() => onSetC(0,255,0)}>G</button>
	<button onClick={() => onSetC(0,0,255)}>B</button>
	<button onClick={() => onSetC(0,0,0)}>0</button>
	<button onClick={() => onSetC(255,255,255)}>255,255,255</button>
	<button class='btnB' onClick={() => {localStorage.setItem('gm_active_till_t',Math.floor(new Date().getTime()+20*1000));}}>set timer 20</button>
	<button class='btnB' onClick={() => {localStorage.removeItem('gm_active_till_t');}}>clear timer</button>
	<button class='btnB' onClick={() => {localStorage.removeItem('gm_active_till_t');localStorage.removeItem('user_id');user_id=null;}}>remove user</button>

    <div className='timer-wrapper'>
      <img src={timerBg} alt='timer' className='timer-bg' />
      <CountDownTimer timeLeft={countdown_t} />
    </div>
  </section>
  );
};
