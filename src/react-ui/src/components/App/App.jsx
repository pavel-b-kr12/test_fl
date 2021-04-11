import React, { useState } from 'react';

import './styles.css';
import { COLOR_DEFAULT } from '../../const';
import logo from '../../assets/logo.svg';
import Game from '../Game';

const App = () => {
  const [activeColor, setActiveColor] = useState(COLOR_DEFAULT);

  return (
    <section className='game'>
      <a href='https://tsum.ua/' className='logo' target='_blank' rel="noreferrer">
        <img src={logo} alt='ЦУМ Киев'/>
      </a>
      <Game activeColor={activeColor} setActiveColor={setActiveColor} />
    </section>
  );
};

export default App;
