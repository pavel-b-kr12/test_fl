import React, { useState, useEffect } from 'react';
import { subscribe } from 'mqtt-react';

import {
  MQTT_TOPIC_SUBSCRIBE,
  GAME_TIME_PLAY
} from '../../const';
import { rgbStringify } from '../../utils';
//import { setTimer } from '../../api';
import Controls from '../Controls';
import LockedScreen from '../LockedScreen';
import LockedScreen0 from '../LockedScreen';


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
		//console.log(countdown);
		
		setGameTime(countdown)
		}, 1000);
    return () => clearInterval(timer);
  }, [gameTime]);

  const setGameTimer = () => {
    //var activeGameTime = localStorage.getItem('activeTime');
    //const isGameActive = JSON.parse(localStorage.getItem('gameActive'));

    const date = new Date();
    const time = date?.getTime();
    //const timeToPlay = time + (GAME_TIME_PLAY * 1000);
	
	//let gm_active_till_t = localStorage.getItem('gm_active_till_t');
	//TODO unlock timer if time >gm_active_till_t  but < gm_active_till_t+GAME_TIME_PLAY
	//
	
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
//console.log(time, timeToPlay, activeGameTime, isGameActive, gm_active_till_t);

    if (gm_active_till_t && (time < gm_active_till_t)) {
      setGameTime(Math.round((gm_active_till_t - time) / 1000));
      return;
    };
    // if ((time < activeGameTime) && isGameActive) {
      // setGameTime(Math.round((activeGameTime - time) / 1000));
      // return;
    // };
/*
    if (time > activeGameTime) {
      localStorage.setItem('gameActive', true);
      //setTimer();
      setGameActive(true);
      setGameTime(GAME_TIME_PLAY);
      localStorage.setItem('activeTime', timeToPlay);
      return;
    }*/
  };

				//test
		  	  	//return <App />
				//return <LockedScreen0 />
	//TODO move to root
	var user_id = localStorage.getItem('user_id');
	//var bFirtsRun=false;
	if(!user_id)
	{
		//bFirtsRun=true;
		user_id=Math.floor(Math.random()*100000);
		localStorage.setItem('user_id',user_id);
	}
	else user_id=parseInt(user_id);

	if(data[0])
	{
		{
		let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
		if(gm_active_till_t-new Date().getTime() <-GAME_TIME_PLAY)
		{ //TODO refactoring
			localStorage.removeItem('gm_active_till_t');
			gm_active_till_t=null;
		}
		
		//console.log(data[0], data[0].user_active, user_id, gm_active_till_t-new Date().getTime());//, data[0].user_active, user_id, parseInt(data[0].user_active)==user_id
		
		}
		var user_active=parseInt(data[0].user_active);
		
		if (user_active===0)
		{
			let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
			if(gm_active_till_t&&new Date().getTime()<gm_active_till_t+GAME_TIME_PLAY) 
			{//some time to other people can react on game open
		//TODO can be smaller than GAME_TIME_PLAY, if no other active users appear
		//TODO2 do not off game if nobody else connected
				return <LockedScreen />
			}
		}
		else
		if (user_active)
		{
			if (user_active===user_id)
			{ //this user is active
				if(!localStorage.getItem('bWasActive'))	localStorage.setItem('bWasActive', 1); //show LockedScreen or LockedScreen0
				let gm_active_till_t = localStorage.getItem('gm_active_till_t');
				if(!gm_active_till_t) //at start of active
				{
					localStorage.setItem('gm_active_till_t',Math.floor(new Date().getTime()+GAME_TIME_PLAY*1000));
				}
	
			}
			else
			{
				localStorage.removeItem('gm_active_till_t');
				return <LockedScreen />
			}

		}
	}
	else
	{
		let gm_active_till_t = localStorage.getItem('gm_active_till_t');
		if(gm_active_till_t)
		{
			gm_active_till_t=parseInt(gm_active_till_t);
			if(new Date().getTime()>gm_active_till_t && new Date().getTime()<gm_active_till_t+GAME_TIME_PLAY)
			{
				if(localStorage.getItem('bWasActive'))
				return <LockedScreen0 />
				else
				return <LockedScreen />
			}
		}
		
		//if (!gameTime) return <LockedScreen />
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
