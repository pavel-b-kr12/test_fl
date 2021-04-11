import React from 'react';
import ReactDOM from 'react-dom';
import { Connector } from 'mqtt-react';

import './index.css';
import App from './components/App';

import reportWebVitals from './reportWebVitals';

const mqttBrokerUrl = process.env.REACT_APP_MQTT_BROKER_URL;

ReactDOM.render(
  <Connector mqttProps={mqttBrokerUrl}>
    <App />
  </Connector>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
