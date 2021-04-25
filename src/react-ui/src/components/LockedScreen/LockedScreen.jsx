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


import logo from '../../assets/logo.svg';
// <h3>РОЗФАРБУЙ МЕНЕ!</h3>
//TODO reload better https://stackoverflow.com/questions/53215285/how-can-i-force-a-component-to-re-render-with-hooks-in-react
export const LockedScreenHello = () => (

  <section className='locked-screen'>
      <a href='https://tsum.ua/' className='logo' target='_blank' rel="noreferrer">
        <img src={logo} alt='ЦУМ Киев'/>
      </a>
    <div className="info">
      <p className='locked-info'>За мить ти відчуєш<br />
	  себе художником.</p>
	  <p className='locked-info'>РОЗФАРБУЙ МЕНЕ!</p>
    <div className='locked-img'>
      <img className='lotus-1' src={lotusAqua} alt="lotusAqua" />
      <img className='lotus-2' src={lotusGreen} alt="lotusGreen" />
      <img className='lotus-3' src={lotusOrange} alt="lotusOrange" />
      <img className='lotus-4' src={lotusPink} alt="lotusPink" />
      <img className='lotus-5' src={lotusViolet} alt="lotusViolet" />
      <img className='lotus-6' src={lotusYellow} alt="lotusYellow" />
    </div>
       <button className="button" onClick={function() {
		////-------	start timer imediately
		/*
		let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));
		if(!gm_active_till_t) //at start of active
		{
			gm_active_till_t=Math.floor(now_t+GAME_TIME_PLAY*1000);
			localStorage.setItem('gm_active_till_t',gm_active_till_t);
		}
		*/
		//-------		
		localStorage.setItem('showHello', new Date().getTime()); 
		   window.location.reload();
	   }}>Розпочати</button>
    </div>
  </section>
);

export const LockedScreen0 = () => (
  <section className='locked-screen'>
      <a href='https://tsum.ua/' className='logo' target='_blank' rel="noreferrer">
        <img src={logo} alt='ЦУМ Киев'/>
      </a>
    <p className='locked-info'>Зачекай, будь ласка,</p>
    <p className='locked-info'>на свій сеанс.</p>
    <p className='locked-info'>Наразі хтось інший</p>
    <p className='locked-info'>створює шедевр.</p>
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
      <a href='https://tsum.ua/' className='logo' target='_blank' rel="noreferrer">
        <img src={logo} alt='ЦУМ Киев'/>
      </a>
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

export const LockedScreenEnd = (/*{ appTime }*/) => (
  <section className='locked-screen'>
      <a href='https://tsum.ua/' className='logo' target='_blank' rel="noreferrer">
        <img src={logo} alt='ЦУМ Киев'/>
      </a>
    <p className='locked-info'>Дякую за твій дотик!</p>
    <p>Ти справжній митець.</p>
    <p>Спробуй ще</p>
    <p>через 2 хвилини.</p>
    <div className='locked-img'>
      <img className='lotus-1' src={lotusAqua} alt="lotusAqua" />
      <img className='lotus-2' src={lotusGreen} alt="lotusGreen" />
      <img className='lotus-3' src={lotusOrange} alt="lotusOrange" />
      <img className='lotus-4' src={lotusPink} alt="lotusPink" />
      <img className='lotus-5' src={lotusViolet} alt="lotusViolet" />
      <img className='lotus-6' src={lotusYellow} alt="lotusYellow" />
    </div>
	<button className="button" onClick={function() {localStorage.setItem('showHello', new Date().getTime()); window.location='https://TSUM.UA'}}>TSUM.UA</button>
    {/* <div className='timer-wrapper'>
      <img src={timerBg} alt='timer' className='timer-bg' />
      <CountDownTimer timeLeft={appTime} />
    </div> */}
  </section>
);
