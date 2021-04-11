import React from 'react';

import './styles.css';
import backgroundImage from '../../assets/main-bg.jpg';
import backgroundImageBlue from '../../assets/main-bg-blue.jpg';
import backgroundImageGreen from '../../assets/main-bg-green.jpg';
import backgroundImageOrange from '../../assets/main-bg-orange.jpg';
import backgroundImagePink from '../../assets/main-bg-pink.jpg';
import backgroundImageViolet from '../../assets/main-bg-violet.jpg';
import backgroundImageYellow from '../../assets/main-bg-yellow.jpg';
import { COLOR_DEFAULT } from '../../const';

const flowers = {
  'rgb(255, 255, 255)': backgroundImage,
  'rgb(251, 206, 91)': backgroundImageOrange,
  'rgb(248, 184, 211)': backgroundImagePink,
  'rgb(186, 111, 168)': backgroundImageViolet,
  'rgb(162, 218, 219)': backgroundImageBlue,
  'rgb(213, 226, 116)': backgroundImageGreen,
  'rgb(255, 248, 161)': backgroundImageYellow
}

const Flowers = ({ activeColor }) => {
  const activeFlower = activeColor ? activeColor : COLOR_DEFAULT;

  return (
    <section className='flowers-field'>
      {Object.keys(flowers).map(flower => (
        <img
          key={flower}
          alt="Alive Flowers are watching you"
          className={flower === activeFlower ? `flowers active` : 'flowers'}
          src={flowers[flower]}
         />
      ))}
      <p className='flowers-info'>Обери мені відтінок та зафарбуй квітки.</p>
    </section>
  )
}

export default Flowers;
