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
import {LockedScreen0,LockedScreenEnd, LockedScreenNoConnect} from '../LockedScreen';
import {ScreenTest} from '../ScreenTest';


const Game = ({ activeColor, setActiveColor, data, mqtt }) => {
  const [gameTime, setGameTime] = useState(null);

  useEffect(() => {
    if (data && data.length) {
      const color = rgbStringify(data[0].color);
      setActiveColor(color);
	  //console.log('useEffect',data[0]);
    }
    return null;
  }, [data,setActiveColor]);

  useEffect(() => setGameTimer());

  useEffect(() => {
    const timer =  setInterval(() => {
		let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
		let countdown=(gm_active_till_t&&(gm_active_till_t-new Date().getTime())>0)?	Math.floor((gm_active_till_t-new Date().getTime())/1000) :0;
		setGameTime(countdown);
		}, 1000);
    return () => clearInterval(timer);
  }, [gameTime]);

  const setGameTimer = () => {

    let now_t = new Date().getTime();

	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));

    if (gm_active_till_t && (now_t < gm_active_till_t)) {
      setGameTime(Math.round((gm_active_till_t - now_t) / 1000));
      return;
    };

  };

//test
//return <CountDownTimer />
	
	let now_t=new Date().getTime();
	
	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
	let bRunRecently=false;
	//let bNotEnd=false;

	const redir = () => {
		console.log('redir');
		if(window.location.search.includes('testesp'))
		{	//'?testesp'
			return <ScreenTest mqtt={mqtt} data={data} redir={1} />
		}

		if(now_t>parseInt(localStorage.getItem('redir_visited'))+10*24*60*60*1000) localStorage.removeItem('redir_visited'); //redirect once per 10 deay
		if(localStorage.getItem('redir_visited'))
		{
			return <LockedScreenEnd />;
		}
		else
		{
			localStorage.setItem('redir_visited',now_t)
			window.location.href = "https://tsum.ua/";//test: if(localStorage.getItem('test_redir')) redir();
		}
	}
	//TODO localStorage.removeItem('redir_visited')
	
	if(gm_active_till_t)
	{
		let recently_d=2*60*1000;
		
		if(now_t < gm_active_till_t)
		{
			//bNotEnd=true;
		}
		else
		if(now_t < gm_active_till_t+recently_d)
		{
			bRunRecently=true;
			//console.log('bRunRecently',now_t, gm_active_till_t+recently_d, (gm_active_till_t+recently_d)-now_t );
			return redir();
		}
		else
		{
			localStorage.removeItem('gm_active_till_t');
			gm_active_till_t=null;
		}
	}

	//console.log('all: ',data[0]);
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
				return redir();
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
				{
					return redir();
				}
				else
					return <LockedScreen0 />
			}
		}
	}
	else
	{	//no data from ESP
		if(window.location.search.includes('testesp') )
		{	//'?testesp'
			return <ScreenTest mqtt={mqtt} data={"-"} />
		}
		
		return <LockedScreenNoConnect />
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
