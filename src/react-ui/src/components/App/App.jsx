import React, { useState } from 'react';

import './styles.css';
import { COLOR_DEFAULT } from '../../const';
//import logo from '../../assets/logo.svg';
import Game from '../Game';
import {LockedScreenHello} from '../LockedScreen';

const App = () => {
  const [activeColor, setActiveColor] = useState(COLOR_DEFAULT);
//---------- LockedScreenHello
let now_t=new Date().getTime();
let showHello = parseInt(localStorage.getItem('showHello'));
let gm_active_till_t = parseInt(localStorage.getItem('gm_active_till_t'));

if((!showHello || now_t > showHello+60000*3) && (!gm_active_till_t || now_t>gm_active_till_t))
{
  return <LockedScreenHello />
}
//----------	
     // <a href='https://tsum.ua/' className='logo' target='_blank' rel="noreferrer">
     //   <img src={logo} alt='ЦУМ Киев'/>
     // </a>
  return (
    <section className='game'>
      <Game activeColor={activeColor} setActiveColor={setActiveColor} />
    </section>
  );
};

export default App;
