import React, { useState, useEffect } from 'react';

import { MQTT_TOPIC_PUBLISH, GAME_TIME_PLAY, idle_d } from '../../const';
import { generateMessage, generateMessageTest } from '../../utils';

import './styles.css';
import timerBg from '../../assets/timer-bg.svg';

import CountDownTimer from '../CountDownTimer';


export const ScreenTest = ({ mqtt }) => {
//TODO move to root
var user_id = localStorage.getItem('user_id');
if(!user_id)
{
	user_id=Math.floor(Math.random()*100000);
	localStorage.setItem('user_id',user_id);
}

let now_t = new Date().getTime();
let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
var countdown_t=Math.round((gm_active_till_t - now_t) / 1000);

//console.log(now_t,gm_active_till_t,countdown_t)

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
	//this.setState();
	//this.forceUpdate();//nw
  };
  

  /*
useEffect(() => setGameTimer());
const setGameTimer = () => {
	console.log("setGameTimer");
	countdown_t=Math.abs(Math.round((gm_active_till_t - now_t) / 1000));
}
 const [gameTime, setGameTime] = useState(null);
useEffect(() => {
const timer =  setInterval(() => {
		let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
		//setGameTime(countdown);
		countdown_t=Math.abs(Math.round((gm_active_till_t - now_t) / 1000));
		console.log(CountDownTimer);

		//CountDownTimer.timeLeft({ timeLeft: performance.now() });
		}, 1000);
    return () => clearInterval(timer);
  }, [gameTime]);
  */
setInterval(() => {console.log(countdown_t);}, 1000);


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
	<button onClick={() => this.setState()}>re</button>
	

    <div className='timer-wrapper'>
      <img src={timerBg} alt='timer' className='timer-bg' />
      <CountDownTimer timeLeft={countdown_t} />
    </div>
  </section>
  );
};



