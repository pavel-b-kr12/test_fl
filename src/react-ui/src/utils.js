export const generateMessage = (color,user_id, endSes_d, idle_d) => (
  `{"state": "ON","brightness": 255,"color": ${JSON.stringify(color)},"transition": 0,"user_id": ${JSON.stringify(user_id)},"endSes_d": ${endSes_d},"idle_d": ${idle_d}}`
);

export const rgbStringify = (color = {}) => Object.keys(color).reduce((rgbStr, col) => (col === 'b'
    ? `${rgbStr}${color[col]})`
    : `${rgbStr}${color[col]}, `
  ), 'rgb(');

export const calculateTimeLeft = (time) => {
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);
  if(time<=0) return ['','']
  return [
    `0${minutes}`,
    seconds < 10 ? `0${seconds}` : seconds
  ]
};
