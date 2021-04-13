// import {
  // GAME_TIME_PLAY
// } from '../src/const';

export const generateMessage = (color,user_id, endSes_d, idle_d) => (
  `{"state": "ON","brightness": 255,"color": ${JSON.stringify(color)},"transition": 0,"user_id": ${JSON.stringify(user_id)},"endSes_d": ${endSes_d},"idle_d": ${idle_d}}`
);
export const generateMessageTest = (color,user_id, endSes_d, idle_d, effNm) => (
  `{"state": "ON","brightness": 255,"color": ${JSON.stringify(color)},"transition": 0,"user_id": ${JSON.stringify(user_id)},"endSes_d": ${endSes_d},"idle_d": ${idle_d},"effect":${effNm}}`
);

export const rgbStringify = (color = {}) => Object.keys(color).reduce((rgbStr, col) => (col === 'b'
    ? `${rgbStr}${color[col]})`
    : `${rgbStr}${color[col]}, `
  ), 'rgb(');

export const calculateTimeLeft = (time) => {
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);
  if(time<=0) return ['','']; //blank w dots
  //if(time<=0) return ['0',GAME_TIME_PLAY];
  return [
    `0${minutes}`,
    seconds < 10 ? `0${seconds}` : seconds
  ]
};
