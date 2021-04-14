import React from 'react';

import './styles.css';
import lotusAqua from '../../assets/lotus-aqua.svg';
import lotusGreen from '../../assets/lotus-green.svg'
import lotusOrange from '../../assets/lotus-orange.svg'
import lotusPink from '../../assets/lotus-pink.svg'
import lotusViolet from '../../assets/lotus-violet.svg'
import lotusYellow from '../../assets/lotus-yellow.svg'
// import timerBg from '../../assets/timer-bg.svg';
// import CountDownTimer from '../CountDownTimer';

export const LockedScreenEnd = (/*{ appTime }*/) => (
  <section className='locked-screen'>
    <p className='locked-info'>Дякую за твій дотик!</p>
    <p>Ти справжній митець.</p>
    <p>Спробуй ще через пару хвилини.</p>
    <div className='locked-img'>
      <img className='lotus-1' src={lotusAqua} alt="lotusAqua" />
      <img className='lotus-2' src={lotusGreen} alt="lotusGreen" />
      <img className='lotus-3' src={lotusOrange} alt="lotusOrange" />
      <img className='lotus-4' src={lotusPink} alt="lotusPink" />
      <img className='lotus-5' src={lotusViolet} alt="lotusViolet" />
      <img className='lotus-6' src={lotusYellow} alt="lotusYellow" />
    </div>
    {/* <div className='timer-wrapper'>
      <img src={timerBg} alt='timer' className='timer-bg' />
      <CountDownTimer timeLeft={appTime} />
    </div> */}
  </section>
);

export const LockedScreen0 = () => (
  <section className='locked-screen'>
    <p className='locked-info'>Зачекайте,</p>
    <p>зараз управлiння</p>
    <p>кимось зайняте</p>
    <div className='locked-img'>
      <img className='lotus-1' src={lotusAqua} alt="lotusAqua" />
      <img className='lotus-2' src={lotusGreen} alt="lotusGreen" />
      <img className='lotus-3' src={lotusOrange} alt="lotusOrange" />
      <img className='lotus-4' src={lotusPink} alt="lotusPink" />
      <img className='lotus-5' src={lotusViolet} alt="lotusViolet" />
      <img className='lotus-6' src={lotusYellow} alt="lotusYellow" />
    </div>
  </section>
);

export const LockedScreenNoConnect = () => (
  <section className='locked-screen'>
    <p className='locked-info'>Вибачайте,</p>
    <p>нема зв'язку</p>
    <p>з сервером  :(</p>
    <div className='locked-img'>
      <img className='lotus-1' src={lotusAqua} alt="lotusAqua" />
      <img className='lotus-2' src={lotusGreen} alt="lotusGreen" />
      <img className='lotus-3' src={lotusOrange} alt="lotusOrange" />
      <img className='lotus-4' src={lotusPink} alt="lotusPink" />
      <img className='lotus-5' src={lotusViolet} alt="lotusViolet" />
      <img className='lotus-6' src={lotusYellow} alt="lotusYellow" />
    </div>
  </section>
);





