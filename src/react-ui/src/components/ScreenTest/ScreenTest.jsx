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
  const onSetCRGB = () => {
	  let req= generateMessage(`{ "r": ${CRGB.r}, "g": ${CRGB.g}, "b": ${CRGB.b} }`, user_id, GAME_TIME_PLAY, idle_d);
	  console.log('onSetCRGB',req);
    mqtt.publish(
      MQTT_TOPIC_PUBLISH,
      req
    );
  };

var CRGB={r:0,g:0,b:0};
var data0='';
var data0user_active='';
// const [data0, setdata0] = useState(null);
// const [data0user_active, setdata0user_active] = useState(null);
		// <p>data[0]: {data0}</p>
		// <p>data[0].user_active: {data0user_active}</p>
const getCountdown = () => {
	let now_t = new Date().getTime();
	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
	//console.log(!gm_active_till_t, now_t)
	let s=gm_active_till_t?(Math.round((gm_active_till_t - now_t) / 1000)):'?';
	data0=data[0];
	s+='  '+data0;
	if(data0)
	{
		data0user_active=data0.user_active;
		s+='  '+data0user_active;
	}
		//s+='  '+data[0].user_active;
	console.log(data0)
	
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
	<button className='btn1' onClick={() => onSelectEff('rnd')}>rnd</button>
	<button className='btn1' onClick={() => onSelectEff('fade_all_but_1')}>fade_all_but_1</button>
	<button className='btn1' onClick={() => onSelectEff('blink_1')}>blink_1 (TODO)</button>
	<button className='btn1' onClick={() => onSelectEff('epileptogen')}>epileptogen (TODO)</button>
	<button className='btn1' onClick={() => onSetC(255,0,0)}>R</button>
	<button className='btn1' onClick={() => onSetC(0,255,0)}>G</button>
	<button className='btn1' onClick={() => onSetC(0,0,255)}>B</button>
	<button className='btn1' onClick={() => onSetC(0,0,0)}>0</button>
	<button className='btn1' onClick={() => onSetC(255,255,255)}>255,255,255</button>
	<button className='btnB' onClick={() => {localStorage.setItem('gm_active_till_t',Math.floor(new Date().getTime()+20*1000));}}>set timer 20</button>
	<button className='btnB' onClick={() => {localStorage.removeItem('gm_active_till_t');}}>clear timer</button>
	<button className='btnB' onClick={() => {localStorage.removeItem('gm_active_till_t');localStorage.removeItem('user_id');user_id=null;}}>remove user</button>
	<input className='rangeCRGB' id='inr' type="range" min="0" max="255" onInput={function(){ CRGB.r=document.getElementById("inr").value; onSetCRGB();}}/>
	<input className='rangeCRGB' id='ing' type="range" min="0" max="255" onInput={function(){ CRGB.g=document.getElementById("ing").value; onSetCRGB();}}/>
	<input className='rangeCRGB' id='inb' type="range" min="0" max="255" onInput={function(){ CRGB.b=document.getElementById("inb").value; onSetCRGB();}}/>
	
    <div className='timer-wrapper'>
      <img src={timerBg} alt='timer' className='timer-bg' />
      <CountDownTimer timeLeft={countdown_t} />
    </div>
	  <div className='left'>
		<p>countdown_t: {countdown_t}</p><br/>
		<p>user_id: {user_id}</p>
      </div>
  </section>
  );
};
