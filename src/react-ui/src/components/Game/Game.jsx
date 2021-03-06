import React, { useState, useEffect, useCallback  } from 'react';
import { subscribe } from 'mqtt-react';

import {
  MQTT_TOPIC_SUBSCRIBE,
  GAME_TIME_PLAY,
  user_id
} from '../../const';
import { rgbStringify } from '../../utils';
//import { setTimer } from '../../api';
import Controls from '../Controls';
import {LockedScreenHello, LockedScreen0,LockedScreenEnd, LockedScreenNoConnect} from '../LockedScreen';
import {ScreenTest} from '../ScreenTest';


const Game = ({ activeColor, setActiveColor, data, mqtt }) => {
  const [gameTime, setGameTime] = useState(null);
  const recently_d=2*60*1000;

  useEffect(() => {
    if (data && data.length) {
      const color = rgbStringify(data[0].color);
      setActiveColor(color);
	  //console.log('useEffect',data[0]);
    }
    return null;
  }, [data,setActiveColor]);

	useEffect(() => setGameTimer());
	
	const timer_calc = useCallback(() => {
		let now_t = new Date().getTime();
		let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
		if(gm_active_till_t)
		{
			//---------- quick fix wrong clock case
			let Mt=Math.floor(now_t+GAME_TIME_PLAY*1000);
			if(gm_active_till_t && gm_active_till_t>Mt) {
				gm_active_till_t=Mt-2000;
				localStorage.setItem('gm_active_till_t', gm_active_till_t);
			}
			//----------	
			
			if(now_t>gm_active_till_t&& now_t < gm_active_till_t+recently_d) 
			{

			}
			else
			{
				let countdown=Math.floor((gm_active_till_t-now_t)/1000);
				if(countdown<0) countdown=0;
				else if(countdown>GAME_TIME_PLAY) countdown=60;
				setGameTime(countdown);
			}
		}
	}, [recently_d]);
	
  useEffect(() => {
    const timer =  setInterval(timer_calc, 1000);
    return () => clearInterval(timer);
  }, [gameTime,timer_calc]);

  const setGameTimer = () => {
	timer_calc();
  };

//test
//return <CountDownTimer />
//return <LockedScreenEnd />
//return <LockedScreen0 />
/*
  return (
    <Controls
      mqtt={mqtt}
      gameTime={gameTime}
      activeColor={activeColor}
      setActiveColor={setActiveColor}
    />
  );
  */
//console.log('0');
	let now_t=new Date().getTime();
	let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
	
	let bRunRecently=false;
	//let bNotEnd=false;

	const redir = () => {
		//console.log('redir');
		if(window.location.search.includes('testesp'))
		{	//'?testesp'
			return <ScreenTest mqtt={mqtt} data={data} redir={1} />
		}
		
		return <LockedScreenEnd />;
/*
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
		*/
	}
	//TODO localStorage.removeItem('redir_visited')
	
	if(gm_active_till_t)
	{
		if(now_t < gm_active_till_t)
		{	//bNotEnd=true;
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
		//console.log('data',data[0]==true );
		//console.log(data[0], data[0].user_active, user_id, parseInt(data[0].user_active)==user_id, gm_active_till_t-now_t); 
		var user_active=parseInt(data[0].user_active);
		
		if (user_active===0)
		{
			if(bRunRecently) 
			//block last user for some time to other people can react on game open
			{
				//TODO can be smaller than GAME_TIME_PLAY, if no other active users appear
				//TODO2 do not off game if nobody else connected
				return redir();
			}
			//else show interface to all users
			//?? now rasp return 0 wo ESP connected
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
					
					localStorage.setItem('showHello',now_t);
					
				}
			}
			else
			{ //block other users
				if(bRunRecently)
					return redir();
				else
					return <LockedScreen0 />
			}
		}
		else return <LockedScreenHello /> //TODO check
	}
	else
	{	//no data from ESP
		if(window.location.search.includes('testesp') )
		{	//'?testesp'
			return <ScreenTest mqtt={mqtt} data={"-"} />
		}
		//console.log('LockedScreenNoConnect: ');
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
