(this["webpackJsonpalive-flowers"]=this["webpackJsonpalive-flowers"]||[]).push([[0],{151:function(t,e){},152:function(t,e){},161:function(t,e,c){},162:function(t,e,c){},163:function(t,e,c){},164:function(t,e,c){},166:function(t,e,c){},167:function(t,e,c){},168:function(t,e,c){},169:function(t,e,c){"use strict";c.r(e);var n=c(1),r=c(57),i=c.n(r),o=c(21),s=(c(161),c(22)),a=(c(162),"flowers/ESP_LED/set"),l=60,u={"rgb(255, 100, 0)":{r:255,g:100,b:0},"rgb(255, 20, 147)":{r:255,g:20,b:147},"rgb(200, 0, 255)":{r:200,g:0,b:255},"rgb(0, 255, 255)":{r:0,g:255,b:255},"rgb(0, 225, 0)":{r:0,g:225,b:0},"rgb(255, 255, 0)":{r:255,g:255,b:0}},b={"rgb(255, 100, 0)":"rgb(251, 206, 91)","rgb(255, 20, 147)":"rgb(248, 184, 211)","rgb(200, 0, 255)":"rgb(186, 111, 168)","rgb(0, 255, 255)":"rgb(162, 218, 219)","rgb(0, 225, 0)":"rgb(213, 226, 116)","rgb(255, 255, 0)":"rgb(255, 248, 161)"},g="rgb(255, 255, 255)",j=c.p+"static/media/logo.ea23c954.svg",m=function(t,e,c,n){return'{"state": "ON","brightness": 255,"color": '.concat(JSON.stringify(t),',"transition": 0,"user_id": ').concat(JSON.stringify(e),',"endSes_d": ').concat(c,',"idle_d": ').concat(n,"}")},f=(c(163),c(164),c(0)),d=function(t){var e=t.timeLeft,c=t.timerClass,n=void 0===c?"":c;return e<=0&&(e=l),Object(f.jsx)("section",{className:n?"timer ".concat(n):"timer",children:e})},O=(c(166),c.p+"static/media/main-bg.f8215fc8.jpg"),v=c.p+"static/media/main-bg-blue.f8e708b8.jpg",p=c.p+"static/media/main-bg-green.d9f1c009.jpg",h={"rgb(255, 255, 255)":O,"rgb(251, 206, 91)":c.p+"static/media/main-bg-orange.087156be.jpg","rgb(248, 184, 211)":c.p+"static/media/main-bg-pink.7e61175a.jpg","rgb(186, 111, 168)":c.p+"static/media/main-bg-violet.0e479edf.jpg","rgb(162, 218, 219)":v,"rgb(213, 226, 116)":p,"rgb(255, 248, 161)":c.p+"static/media/main-bg-yellow.94fa6b70.jpg"},x=function(t){var e=t.activeColor,c=e||g;return Object(f.jsxs)("section",{className:"flowers-field",children:[Object.keys(h).map((function(t){return Object(f.jsx)("img",{alt:"Alive Flowers are watching you",className:t===c?"flowers active":"flowers",src:h[t]},t)})),Object(f.jsx)("p",{className:"flowers-info",children:"\u041e\u0431\u0435\u0440\u0438 \u043c\u0435\u043d\u0456 \u0432\u0456\u0434\u0442\u0456\u043d\u043e\u043a \u0442\u0430 \u0437\u0430\u0444\u0430\u0440\u0431\u0443\u0439 \u043a\u0432\u0456\u0442\u043a\u0438."})]})},_=function(t){var e=t.gameTime,c=t.activeColor,n=t.setActiveColor,r=t.mqtt,i=localStorage.getItem("user_id");i||(i=Math.floor(1e5*Math.random()),localStorage.setItem("user_id",i));return Object(f.jsxs)("section",{className:"controls-wrap",children:[Object(f.jsx)(x,{activeColor:b[c]}),Object(f.jsxs)("section",{className:"controls",children:[Object(f.jsx)("ul",{children:Object.keys(u).map((function(t,e){return Object(f.jsx)("li",{className:c===t?"button-".concat(e+1," active"):"button-".concat(e+1),onClick:function(){return function(t){r.publish(a,m(u[t],i,l,30)),n(t)}(t)},style:{background:b[t]}},t)}))}),Object(f.jsx)(d,{timerClass:"controls-timer",timeLeft:e})]})]})},k=(c(167),c.p+"static/media/lotus-aqua.e0d01c2a.svg"),N=c.p+"static/media/lotus-green.92564941.svg",w=c.p+"static/media/lotus-orange.17c89be0.svg",C=c.p+"static/media/lotus-pink.87b2eeeb.svg",S=c.p+"static/media/lotus-violet.8a14d3ad.svg",I=c.p+"static/media/lotus-yellow.dc894035.svg",y=function(){return Object(f.jsxs)("section",{className:"locked-screen",children:[Object(f.jsx)("p",{className:"locked-info",children:"\u0417\u0430\u0447\u0435\u043a\u0430\u0439\u0442\u0435,"}),Object(f.jsx)("p",{children:"\u0437\u0430\u0440\u0430\u0437 \u0443\u043f\u0440\u0430\u0432\u043bi\u043d\u043d\u044f"}),Object(f.jsx)("p",{children:"\u043a\u0438\u043c\u043e\u0441\u044c \u0437\u0430\u0439\u043d\u044f\u0442\u0435"}),Object(f.jsxs)("div",{className:"locked-img",children:[Object(f.jsx)("img",{className:"lotus-1",src:k,alt:"lotusAqua"}),Object(f.jsx)("img",{className:"lotus-2",src:N,alt:"lotusGreen"}),Object(f.jsx)("img",{className:"lotus-3",src:w,alt:"lotusOrange"}),Object(f.jsx)("img",{className:"lotus-4",src:C,alt:"lotusPink"}),Object(f.jsx)("img",{className:"lotus-5",src:S,alt:"lotusViolet"}),Object(f.jsx)("img",{className:"lotus-6",src:I,alt:"lotusYellow"})]})]})},T=(c(168),c.p+"static/media/timer-bg.eda28634.svg"),D=void 0,M=function(t){var e=t.mqtt,c=localStorage.getItem("user_id");c||(c=Math.floor(1e5*Math.random()),localStorage.setItem("user_id",c));var n=(new Date).getTime(),r=parseInt(localStorage.getItem("gm_active_till_t")),i=Math.round((r-n)/1e3),o=function(t){var n=function(t,e,c,n,r){return'{"state": "ON","brightness": 255,"color": '.concat(JSON.stringify(t),',"transition": 0,"user_id": ').concat(JSON.stringify(e),',"endSes_d": ').concat(c,',"idle_d": ').concat(n,',"effect":').concat(r,"}")}('{ "r": 99, "g": 0, "b": 0 }',c,l,30,t);console.log(t,n),e.publish(a,n)},s=function(t,n,r){var i=m('{ "r": '.concat(t,', "g": ').concat(n,', "b": ').concat(r," }"),c,l,30);console.log(i),e.publish(a,i)};return setInterval((function(){console.log(i)}),1e3),Object(f.jsxs)("section",{className:"locked-screen",children:[Object(f.jsx)("p",{className:"locked-info"}),Object(f.jsx)("p",{}),Object(f.jsx)("button",{onClick:function(){return o("rnd")},children:"rnd"}),Object(f.jsx)("button",{onClick:function(){return o("fade_all_but_1")},children:"fade_all_but_1"}),Object(f.jsx)("button",{onClick:function(){return o("blink_1")},children:"blink_1 (TODO)"}),Object(f.jsx)("button",{onClick:function(){return o("epileptogen")},children:"epileptogen (TODO)"}),Object(f.jsx)("button",{onClick:function(){return s(255,0,0)},children:"R"}),Object(f.jsx)("button",{onClick:function(){return s(0,255,0)},children:"G"}),Object(f.jsx)("button",{onClick:function(){return s(0,0,255)},children:"B"}),Object(f.jsx)("button",{onClick:function(){return s(0,0,0)},children:"0"}),Object(f.jsx)("button",{onClick:function(){return s(255,255,255)},children:"255,255,255"}),Object(f.jsx)("button",{onClick:function(){return D.setState()},children:"re"}),Object(f.jsxs)("div",{className:"timer-wrapper",children:[Object(f.jsx)("img",{src:T,alt:"timer",className:"timer-bg"}),Object(f.jsx)(d,{timeLeft:i})]})]})},q=Object(o.subscribe)({topic:"flowers/ESP_LED"})((function(t){var e=t.activeColor,c=t.setActiveColor,r=t.data,i=t.mqtt,o=Object(n.useState)(null),a=Object(s.a)(o,2),u=a[0],b=a[1];Object(n.useEffect)((function(){if(r&&r.length){var t=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(t).reduce((function(e,c){return"b"===c?"".concat(e).concat(t[c],")"):"".concat(e).concat(t[c],", ")}),"rgb(")}(r[0].color);c(t)}return null}),[r,c]),Object(n.useEffect)((function(){return g()})),Object(n.useEffect)((function(){var t=setInterval((function(){var t=parseInt(localStorage.getItem("gm_active_till_t")),e=t&&t-(new Date).getTime()>0?Math.floor((t-(new Date).getTime())/1e3):0;b(e)}),1e3);return function(){return clearInterval(t)}}),[u]);var g=function(){var t=(new Date).getTime(),e=parseInt(localStorage.getItem("gm_active_till_t"));e&&t<e&&b(Math.round((e-t)/1e3))},j=localStorage.getItem("user_id");j?j=parseInt(j):(j=Math.floor(1e5*Math.random()),localStorage.setItem("user_id",j));var m=(new Date).getTime(),d=parseInt(localStorage.getItem("gm_active_till_t"));m>d+12e5&&(localStorage.removeItem("gm_active_till_t"),d=null);var O=function(){window.location.href="https://tsum.ua/"};if(r[0]){var v=parseInt(r[0].user_active);0===v?d&&m<d+l&&O():v&&(v===j?d||(d=Math.floor(m+6e4),localStorage.setItem("gm_active_till_t",d)):O())}else{if(!d)return Object(f.jsx)(y,{});if(m>d&&m<d+l){if(d<m-36e5)return Object(f.jsx)(y,{});O()}}return window.location.search.includes("testesp")?Object(f.jsx)(M,{mqtt:i}):Object(f.jsx)(_,{mqtt:i,gameTime:u,activeColor:e,setActiveColor:c})})),E=function(){var t=Object(n.useState)(g),e=Object(s.a)(t,2),c=e[0],r=e[1];return Object(f.jsxs)("section",{className:"game",children:[Object(f.jsx)("a",{href:"https://tsum.ua/",className:"logo",target:"_blank",rel:"noreferrer",children:Object(f.jsx)("img",{src:j,alt:"\u0426\u0423\u041c \u041a\u0438\u0435\u0432"})}),Object(f.jsx)(q,{activeColor:c,setActiveColor:r})]})},L=function(t){t&&t instanceof Function&&c.e(3).then(c.bind(null,170)).then((function(e){var c=e.getCLS,n=e.getFID,r=e.getFCP,i=e.getLCP,o=e.getTTFB;c(t),n(t),r(t),i(t),o(t)}))};i.a.render(Object(f.jsx)(o.Connector,{mqttProps:"ws://10.42.0.1:9001",children:Object(f.jsx)(E,{})}),document.getElementById("root")),L()},69:function(t,e){},71:function(t,e){}},[[169,1,2]]]);
//# sourceMappingURL=main.6cfadd3f.chunk.js.map