import React from 'react';

import './styles.css';
import { calculateTimeLeft } from '../../utils';

const CountDownTimer = ({ timeLeft, timerClass = '' }) => {
  const [minutes, seconds] = calculateTimeLeft(timeLeft);

  return (
    <section className={timerClass ? `timer ${timerClass}` : 'timer'}>
      {minutes} : {seconds}
    </section>
  )
};

export default CountDownTimer;
