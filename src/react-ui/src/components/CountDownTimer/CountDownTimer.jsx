import React from 'react';
import {
  GAME_TIME_PLAY
} from '../../const';

import './styles.css';
//import { calculateTimeLeft } from '../../utils';

const CountDownTimer = ({ timeLeft, timerClass = '' }) => {
	//sec only
	if(timeLeft<=0) timeLeft=GAME_TIME_PLAY;
  return (
    <section className={timerClass ? `timer ${timerClass}` : 'timer'}>
      {timeLeft}
    </section>
  )
  /* //min:sec
  const [minutes, seconds] = calculateTimeLeft(timeLeft);

  return (
    <section className={timerClass ? `timer ${timerClass}` : 'timer'}>
      {minutes} : {seconds}
    </section>
  )
  */
};

export default CountDownTimer;
