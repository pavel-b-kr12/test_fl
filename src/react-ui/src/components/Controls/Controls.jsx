import React from 'react';

import './styles.css';
import { COLORS, FAKE_COLORS, MQTT_TOPIC_PUBLISH, GAME_TIME_PLAY, idle_d,  user_id } from '../../const';
import { generateMessage } from '../../utils';
import CountDownTimer from '../CountDownTimer';
import Flowers from '../Flowers';

const Controls = ({ gameTime, activeColor, setActiveColor, mqtt }) => {
  const onSelectColor = color => {
    mqtt.publish(
      MQTT_TOPIC_PUBLISH,
      generateMessage(COLORS[color], user_id, GAME_TIME_PLAY, idle_d)
    );
    setActiveColor(color);
  };

  return (
    <section className='controls-wrap'>
      <Flowers activeColor={FAKE_COLORS[activeColor]} />
      <section className='controls'>
        <ul>
          {Object.keys(COLORS).map((color, i) => (
            <li
              key={color}
              className={activeColor === color ? `button-${i+1} active` : `button-${i+1}`}
              onClick={() => onSelectColor(color)}
              style={{ background: FAKE_COLORS[color] }}
            />
          ))}
        </ul>
        <CountDownTimer
          timerClass='controls-timer'
          timeLeft={gameTime}
        />
      </section>
    </section>
  );
};

export default Controls;
