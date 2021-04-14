import React, { useState, useEffect } from 'react';
import { subscribe } from 'mqtt-react';

import {
  MQTT_TOPIC_SUBSCRIBE,
  GAME_TIME_PLAY,
  user_id
} from '../../const';
import { rgbStringify } from '../../utils';
//import { setTimer } from '../../api';
import Controls from '../Controls';
import {LockedScreen, LockedScreen0} from '../LockedScreen';
import {ScreenTest} from '../ScreenTest';


const Game = ({ activeColor, setActiveColor, data, mqtt }) => {
  const [gameTime, setGameTime] = useState(null);

  //const game = localStorage.getItem('gameActive');
  //const gameState = game ? JSON.parse(game) : true;
  //const [gameActive, setGameActive] = useState(gameState);
  
  useEffect(() => {
    if (data && data.length) {
      const color = rgbStringify(data[0].color);
      setActiveColor(color);
    }
    return null;
  }, [data,setActiveColor]);

  //useEffect(() => setGameTimer(), [gameActive]);
  useEffect(() => setGameTimer());

  useEffect(() => {
    // if (gameTime === 0) {
      // localStorage.setItem('gameActive', !gameActive);
    // };
//const timer = gameTime > 0 && setInterval(() => setGameTime(gameTime - 1), 1000);
//console.log(gameTime);
    const timer =  setInterval(() => {
		let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
		let countdown=(gm_active_till_t&&(gm_active_till_t-new Date().getTime())>0)?	Math.floor((gm_active_till_t-new Date().getTime())/1000) :0;
		setGameTime(countdown);
		}, 1000);
    return () => clearInterval(timer);
  }, [gameTime]);

  const setGameTimer = () => {
    //var activeGameTime = localStorage.getItem('activeTime');
    //const isGameActive = JSON.parse(localStorage.getItem('gameActive'));

    let now_t = new Date().getTime();
    //const timeToPlay = now_t + (GAME_TIME_PLAY * 1000);

	/*
    if (!activeGameTime) {
      localStorage.setItem('gameActive', true);
      //setTimer();
      setGameTime(GAME_TIME_PLAY);
      localStorage.setItem('activeTime', timeToPlay);
      return;
    }
	*/

	//activeGameTime=parseInt(activeGameTime);
	
	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
//console.log(now_t, timeToPlay, activeGameTime, isGameActive, gm_active_till_t);

    if (gm_active_till_t && (now_t < gm_active_till_t)) {
      setGameTime(Math.round((gm_active_till_t - now_t) / 1000));
      return;
    };
    // if ((now_t < activeGameTime) && isGameActive) {
      // setGameTime(Math.round((activeGameTime - now_t) / 1000));
      // return;
    // };
/*
    if (now_t > activeGameTime) {
      localStorage.setItem('gameActive', true);
      //setTimer();
      setGameActive(true);
      setGameTime(GAME_TIME_PLAY);
      localStorage.setItem('activeTime', timeToPlay);
      return;
    }*/
  };

//test
//return <CountDownTimer />
//return <LockedScreen0 />

	
	let now_t=new Date().getTime();
	
	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
	let bRunRecently=false;
	if(gm_active_till_t)
	{
		if(now_t < gm_active_till_t+60*20*1000)
			bRunRecently=true;
		else
		{
			localStorage.removeItem('gm_active_till_t');
			gm_active_till_t=null;
		}
	}
		
	const redir = () => {
		window.location.href = "https://tsum.ua/";//test: if(localStorage.getItem('test_redir')) redir();
	}
	
	if(data[0])
	{
		//console.log(data[0], data[0].user_active, user_id, parseInt(data[0].user_active)==user_id, gm_active_till_t-now_t); 

		var user_active=parseInt(data[0].user_active);
		
		if (user_active===0)
		{
			if(bRunRecently) 
			{//some time to other people can react on game open
		//TODO can be smaller than GAME_TIME_PLAY, if no other active users appear
		//TODO2 do not off game if nobody else connected
				//return <LockedScreenEnd />
				redir();
			}
			//else show interface to all users
		}
		else
		if (user_active)
		{
			if (user_active===user_id)
			{ //this user is active
				if(!gm_active_till_t) //at start of active
				{
					gm_active_till_t=Math.floor(now_t+GAME_TIME_PLAY*1000);
					localStorage.setItem('gm_active_till_t',gm_active_till_t);
				}
			}
			else
			{
				if(bRunRecently)
					redir();
				else
					return <LockedScreen0 />
			}
		}
	}
	else
	{//no data from ESP
		if(window.location.search.includes('testesp'))
		{	//'?testesp'
			return <ScreenTest mqtt={mqtt} data={data} />
		}
		/* //TODO think if this need and how
		if(gm_active_till_t)
		{
			if(now_t>gm_active_till_t && now_t<gm_active_till_t+GAME_TIME_PLAY)
			{
				if(bRunRecently)
					redir();
				else
					return <LockedScreen0 />
			}
		}
		else return <LockedScreen0 />
		*/
	}
	
	if(window.location.search.includes('testesp'))
	{	//'?testesp'
		return <ScreenTest mqtt={mqtt} data={data} />
	}

  return (
    <Controls
      mqtt={mqtt}
      gameTime={gameTime}
      activeColor={activeColor}
      setActiveColor={setActiveColor}
    />
  );
};

export default subscribe({ topic: MQTT_TOPIC_SUBSCRIBE })(Game);
