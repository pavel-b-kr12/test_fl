(this["webpackJsonpalive-flowers"]=this["webpackJsonpalive-flowers"]||[]).push([[0],{151:function(e,t){},152:function(e,t){},161:function(e,t,c){},162:function(e,t,c){},163:function(e,t,c){},164:function(e,t,c){},166:function(e,t,c){},167:function(e,t,c){},168:function(e,t,c){},169:function(e,t,c){"use strict";c.r(t);var s=c(1),n=c(57),a=c.n(n),l=c(22),o=(c(161),c(13)),r=(c(162),"flowers/ESP_LED/set"),i=60,u={"rgb(255, 100, 0)":{r:255,g:100,b:0},"rgb(255, 20, 147)":{r:255,g:20,b:147},"rgb(200, 0, 255)":{r:200,g:0,b:255},"rgb(0, 255, 255)":{r:0,g:255,b:255},"rgb(0, 225, 0)":{r:0,g:225,b:0},"rgb(255, 255, 0)":{r:255,g:255,b:0}},j={"rgb(255, 100, 0)":"rgb(251, 206, 91)","rgb(255, 20, 147)":"rgb(248, 184, 211)","rgb(200, 0, 255)":"rgb(186, 111, 168)","rgb(0, 255, 255)":"rgb(162, 218, 219)","rgb(0, 225, 0)":"rgb(213, 226, 116)","rgb(255, 255, 0)":"rgb(255, 248, 161)"},b="rgb(255, 255, 255)",m=parseInt(localStorage.getItem("user_id"));m||(m=Math.floor(1e5*Math.random()),localStorage.setItem("user_id",m));var g=function(e,t,c,s){return'{"state": "ON","brightness": 255,"color": '.concat(JSON.stringify(e),',"transition": 0,"user_id": ').concat(JSON.stringify(t),',"endSes_d": ').concat(c,',"idle_d": ').concat(s,"}")},d=(c(163),c(164),c(0)),f=function(e){var t=e.timeLeft,c=e.timerClass,s=void 0===c?"":c;return t<=0&&(t=i),Object(d.jsx)("section",{className:s?"timer ".concat(s):"timer",children:t})},O=(c(166),c.p+"static/media/main-bg.f8215fc8.jpg"),x=c.p+"static/media/main-bg-blue.f8e708b8.jpg",h=c.p+"static/media/main-bg-green.d9f1c009.jpg",p={"rgb(255, 255, 255)":O,"rgb(251, 206, 91)":c.p+"static/media/main-bg-orange.087156be.jpg","rgb(248, 184, 211)":c.p+"static/media/main-bg-pink.7e61175a.jpg","rgb(186, 111, 168)":c.p+"static/media/main-bg-violet.0e479edf.jpg","rgb(162, 218, 219)":x,"rgb(213, 226, 116)":h,"rgb(255, 248, 161)":c.p+"static/media/main-bg-yellow.94fa6b70.jpg"},N=function(e){var t=e.activeColor,c=t||b;return Object(d.jsxs)("section",{className:"flowers-field",children:[Object.keys(p).map((function(e){return Object(d.jsx)("img",{alt:"Alive Flowers are watching you",className:e===c?"flowers active":"flowers",src:p[e]},e)})),Object(d.jsx)("p",{className:"flowers-info",children:"\u041e\u0431\u0435\u0440\u0438 \u043c\u0435\u043d\u0456 \u0432\u0456\u0434\u0442\u0456\u043d\u043e\u043a \u0442\u0430 \u0440\u043e\u0437\u0444\u0430\u0440\u0431\u0443\u0439 \u043a\u0432\u0456\u0442\u0438."})]})},v=function(e){var t=e.gameTime,c=e.activeColor,s=e.setActiveColor,n=e.mqtt;return Object(d.jsxs)("section",{className:"controls-wrap",children:[Object(d.jsx)(N,{activeColor:j[c]}),Object(d.jsxs)("section",{className:"controls",children:[Object(d.jsx)("ul",{children:Object.keys(u).map((function(e,t){return Object(d.jsx)("li",{className:c===e?"button-".concat(t+1," active"):"button-".concat(t+1),onClick:function(){return function(e){n.publish(r,g(u[e],m,i,30)),s(e)}(e)},style:{background:j[e]}},e)}))}),Object(d.jsx)(f,{timerClass:"controls-timer",timeLeft:t})]})]})},_=(c(167),c.p+"static/media/lotus-aqua.e0d01c2a.svg"),k=c.p+"static/media/lotus-green.92564941.svg",w=c.p+"static/media/lotus-orange.17c89be0.svg",I=c.p+"static/media/lotus-pink.87b2eeeb.svg",C=c.p+"static/media/lotus-violet.8a14d3ad.svg",S=c.p+"static/media/lotus-yellow.dc894035.svg",y=c.p+"static/media/logo.ea23c954.svg",T=function(){return Object(d.jsxs)("section",{className:"locked-screen",children:[Object(d.jsx)("a",{href:"https://tsum.ua/",className:"logo",target:"_blank",rel:"noreferrer",children:Object(d.jsx)("img",{src:y,alt:"\u0426\u0423\u041c \u041a\u0438\u0435\u0432"})}),Object(d.jsxs)("div",{className:"info",children:[Object(d.jsxs)("p",{className:"locked-info",children:["\u0417\u0430 \u043c\u0438\u0442\u044c \u0442\u0438 \u0432\u0456\u0434\u0447\u0443\u0454\u0448",Object(d.jsx)("br",{}),"\u0441\u0435\u0431\u0435 \u0445\u0443\u0434\u043e\u0436\u043d\u0438\u043a\u043e\u043c."]}),Object(d.jsx)("p",{className:"locked-info",children:"\u0420\u041e\u0417\u0424\u0410\u0420\u0411\u0423\u0419 \u041c\u0415\u041d\u0415!"}),Object(d.jsxs)("div",{className:"locked-img",children:[Object(d.jsx)("img",{className:"lotus-1",src:_,alt:"lotusAqua"}),Object(d.jsx)("img",{className:"lotus-2",src:k,alt:"lotusGreen"}),Object(d.jsx)("img",{className:"lotus-3",src:w,alt:"lotusOrange"}),Object(d.jsx)("img",{className:"lotus-4",src:I,alt:"lotusPink"}),Object(d.jsx)("img",{className:"lotus-5",src:C,alt:"lotusViolet"}),Object(d.jsx)("img",{className:"lotus-6",src:S,alt:"lotusYellow"})]}),Object(d.jsx)("button",{className:"button",onClick:function(){localStorage.setItem("showHello",(new Date).getTime()),window.location.reload()},children:"\u0420\u043e\u0437\u043f\u043e\u0447\u0430\u0442\u0438"})]})]})},D=function(){return Object(d.jsxs)("section",{className:"locked-screen",children:[Object(d.jsx)("a",{href:"https://tsum.ua/",className:"logo",target:"_blank",rel:"noreferrer",children:Object(d.jsx)("img",{src:y,alt:"\u0426\u0423\u041c \u041a\u0438\u0435\u0432"})}),Object(d.jsx)("p",{className:"locked-info",children:"\u0417\u0430\u0447\u0435\u043a\u0430\u0439, \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430,"}),Object(d.jsx)("p",{className:"locked-info",children:"\u043d\u0430 \u0441\u0432\u0456\u0439 \u0441\u0435\u0430\u043d\u0441."}),Object(d.jsx)("p",{className:"locked-info",children:"\u041d\u0430\u0440\u0430\u0437\u0456 \u0445\u0442\u043e\u0441\u044c \u0456\u043d\u0448\u0438\u0439"}),Object(d.jsx)("p",{className:"locked-info",children:"\u0441\u0442\u0432\u043e\u0440\u044e\u0454 \u0448\u0435\u0434\u0435\u0432\u0440."}),Object(d.jsxs)("div",{className:"locked-img",children:[Object(d.jsx)("img",{className:"lotus-1",src:_,alt:"lotusAqua"}),Object(d.jsx)("img",{className:"lotus-2",src:k,alt:"lotusGreen"}),Object(d.jsx)("img",{className:"lotus-3",src:w,alt:"lotusOrange"}),Object(d.jsx)("img",{className:"lotus-4",src:I,alt:"lotusPink"}),Object(d.jsx)("img",{className:"lotus-5",src:C,alt:"lotusViolet"}),Object(d.jsx)("img",{className:"lotus-6",src:S,alt:"lotusYellow"})]})]})},q=function(){return Object(d.jsxs)("section",{className:"locked-screen",children:[Object(d.jsx)("a",{href:"https://tsum.ua/",className:"logo",target:"_blank",rel:"noreferrer",children:Object(d.jsx)("img",{src:y,alt:"\u0426\u0423\u041c \u041a\u0438\u0435\u0432"})}),Object(d.jsx)("p",{className:"locked-info",children:"\u0412\u0438\u0431\u0430\u0447\u0430\u0439\u0442\u0435,"}),Object(d.jsx)("p",{children:"\u043d\u0435\u043c\u0430 \u0437\u0432'\u044f\u0437\u043a\u0443"}),Object(d.jsx)("p",{children:"\u0437 \u0441\u0435\u0440\u0432\u0435\u0440\u043e\u043c  :("}),Object(d.jsxs)("div",{className:"locked-img",children:[Object(d.jsx)("img",{className:"lotus-1",src:_,alt:"lotusAqua"}),Object(d.jsx)("img",{className:"lotus-2",src:k,alt:"lotusGreen"}),Object(d.jsx)("img",{className:"lotus-3",src:w,alt:"lotusOrange"}),Object(d.jsx)("img",{className:"lotus-4",src:I,alt:"lotusPink"}),Object(d.jsx)("img",{className:"lotus-5",src:C,alt:"lotusViolet"}),Object(d.jsx)("img",{className:"lotus-6",src:S,alt:"lotusYellow"})]})]})},B=function(){return Object(d.jsxs)("section",{className:"locked-screen",children:[Object(d.jsx)("a",{href:"https://tsum.ua/",className:"logo",target:"_blank",rel:"noreferrer",children:Object(d.jsx)("img",{src:y,alt:"\u0426\u0423\u041c \u041a\u0438\u0435\u0432"})}),Object(d.jsx)("p",{className:"locked-info",children:"\u0414\u044f\u043a\u0443\u044e \u0437\u0430 \u0442\u0432\u0456\u0439 \u0434\u043e\u0442\u0438\u043a!"}),Object(d.jsx)("p",{children:"\u0422\u0438 \u0441\u043f\u0440\u0430\u0432\u0436\u043d\u0456\u0439 \u043c\u0438\u0442\u0435\u0446\u044c."}),Object(d.jsx)("p",{children:"\u0421\u043f\u0440\u043e\u0431\u0443\u0439 \u0449\u0435"}),Object(d.jsx)("p",{children:"\u0447\u0435\u0440\u0435\u0437 2 \u0445\u0432\u0438\u043b\u0438\u043d\u0438."}),Object(d.jsxs)("div",{className:"locked-img",children:[Object(d.jsx)("img",{className:"lotus-1",src:_,alt:"lotusAqua"}),Object(d.jsx)("img",{className:"lotus-2",src:k,alt:"lotusGreen"}),Object(d.jsx)("img",{className:"lotus-3",src:w,alt:"lotusOrange"}),Object(d.jsx)("img",{className:"lotus-4",src:I,alt:"lotusPink"}),Object(d.jsx)("img",{className:"lotus-5",src:C,alt:"lotusViolet"}),Object(d.jsx)("img",{className:"lotus-6",src:S,alt:"lotusYellow"})]}),Object(d.jsx)("button",{className:"button",onClick:function(){localStorage.setItem("showHello",(new Date).getTime()),window.location="https://TSUM.UA"},children:"TSUM.UA"})]})},E=(c(168),c.p+"static/media/timer-bg.eda28634.svg"),A=function(e){var t=e.mqtt,c=e.data,n=function(e){var c=function(e,t,c,s,n){return'{"state": "ON","brightness": 255,"color": '.concat(JSON.stringify(e),',"transition": 0,"user_id": ').concat(JSON.stringify(t),',"endSes_d": ').concat(c,',"idle_d": ').concat(s,',"effect":').concat(n,"}")}('{ "r": 99, "g": 0, "b": 0 }',m,i,30,e);console.log(e,c),t.publish(r,c)},a=function(e,c,s){var n=g('{ "r": '.concat(e,', "g": ').concat(c,', "b": ').concat(s," }"),m,i,30);console.log(n),t.publish(r,n)},l=function(){var e=g('{ "r": '.concat(u.r,', "g": ').concat(u.g,', "b": ').concat(u.b," }"),m,i,30);console.log("onSetCRGB",e),t.publish(r,e)},u={r:0,g:0,b:0},j="",b=function(){var e=(new Date).getTime(),t=parseInt(localStorage.getItem("gm_active_till_t")),s=t?Math.round((t-e)/1e3):"?";return s+="  "+(j=c[0]),j&&(s+="  "+j.user_active),console.log(j),s},O=Object(s.useState)(b()),x=Object(o.a)(O,2),h=x[0],p=x[1];return Object(s.useEffect)((function(){var e=setInterval((function(){p(b())}),1e3);return function(){return clearInterval(e)}})),Object(d.jsxs)("section",{className:"locked-screen",children:[Object(d.jsx)("p",{className:"locked-info"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return n("rnd")},children:"rnd"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return n("fade_all_but_1")},children:"fade_all_but_1"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return n("blink_1")},children:"blink_1 (TODO)"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return n("epileptogen")},children:"epileptogen (TODO)"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return a(255,0,0)},children:"R"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return a(0,255,0)},children:"G"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return a(0,0,255)},children:"B"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return a(0,0,0)},children:"0"}),Object(d.jsx)("button",{className:"btn1",onClick:function(){return a(255,255,255)},children:"255,255,255"}),Object(d.jsx)("button",{className:"btnB",onClick:function(){localStorage.setItem("gm_active_till_t",Math.floor((new Date).getTime()+2e4))},children:"set timer 20"}),Object(d.jsx)("button",{className:"btnB",onClick:function(){localStorage.removeItem("gm_active_till_t")},children:"clear timer"}),Object(d.jsx)("button",{className:"btnB",onClick:function(){localStorage.removeItem("gm_active_till_t"),localStorage.removeItem("user_id"),user_id=null},children:"remove user"}),Object(d.jsx)("input",{className:"rangeCRGB",id:"inr",type:"range",min:"0",max:"255",onInput:function(){u.r=document.getElementById("inr").value,l()}}),Object(d.jsx)("input",{className:"rangeCRGB",id:"ing",type:"range",min:"0",max:"255",onInput:function(){u.g=document.getElementById("ing").value,l()}}),Object(d.jsx)("input",{className:"rangeCRGB",id:"inb",type:"range",min:"0",max:"255",onInput:function(){u.b=document.getElementById("inb").value,l()}}),Object(d.jsxs)("div",{className:"timer-wrapper",children:[Object(d.jsx)("img",{src:E,alt:"timer",className:"timer-bg"}),Object(d.jsx)(f,{timeLeft:h})]}),Object(d.jsxs)("div",{className:"left",children:[Object(d.jsxs)("p",{children:["countdown_t: ",h]}),Object(d.jsx)("br",{}),Object(d.jsxs)("p",{children:["user_id: ",m]})]})]})},G=Object(l.subscribe)({topic:"flowers/ESP_LED"})((function(e){var t=e.activeColor,c=e.setActiveColor,n=e.data,a=e.mqtt,l=Object(s.useState)(null),r=Object(o.a)(l,2),i=r[0],u=r[1];Object(s.useEffect)((function(){if(n&&n.length){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce((function(t,c){return"b"===c?"".concat(t).concat(e[c],")"):"".concat(t).concat(e[c],", ")}),"rgb(")}(n[0].color);c(e),console.log("useEffect",n[0])}return null}),[n,c]),Object(s.useEffect)((function(){return j()})),Object(s.useEffect)((function(){var e=setInterval((function(){var e=parseInt(localStorage.getItem("gm_active_till_t")),t=e&&e-(new Date).getTime()>0?Math.floor((e-(new Date).getTime())/1e3):0;u(t)}),1e3);return function(){return clearInterval(e)}}),[i]);var j=function(){var e=(new Date).getTime(),t=parseInt(localStorage.getItem("gm_active_till_t"));t&&e<t&&u(Math.round((t-e)/1e3))},b=(new Date).getTime(),g=parseInt(localStorage.getItem("gm_active_till_t")),f=!1,O=function(){return console.log("redir"),window.location.search.includes("testesp")?Object(d.jsx)(A,{mqtt:a,data:n,redir:1}):Object(d.jsx)(B,{})};if(g){if(b<g);else{if(b<g+12e4)return f=!0,O();localStorage.removeItem("gm_active_till_t"),g=null}}if(!n[0])return window.location.search.includes("testesp")?Object(d.jsx)(A,{mqtt:a,data:"-"}):Object(d.jsx)(q,{});var x=parseInt(n[0].user_active);if(0===x){if(f)return O()}else{if(!x)return Object(d.jsx)(T,{});if(x!==m)return f?O():Object(d.jsx)(D,{});g||(g=Math.floor(b+6e4),localStorage.setItem("gm_active_till_t",g),localStorage.setItem("showHello",b))}if(window.location.search.includes("testesp"))return Object(d.jsx)(A,{mqtt:a,data:n});var h=parseInt(localStorage.getItem("showHello"));return!h||b>h+18e4?Object(d.jsx)(T,{}):Object(d.jsx)(v,{mqtt:a,gameTime:i,activeColor:t,setActiveColor:c})})),M=function(){var e=Object(s.useState)(b),t=Object(o.a)(e,2),c=t[0],n=t[1],a=(new Date).getTime(),l=parseInt(localStorage.getItem("showHello"));return!l||a>l+18e4?Object(d.jsx)(T,{}):Object(d.jsx)("section",{className:"game",children:Object(d.jsx)(G,{activeColor:c,setActiveColor:n})})},P=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,170)).then((function(t){var c=t.getCLS,s=t.getFID,n=t.getFCP,a=t.getLCP,l=t.getTTFB;c(e),s(e),n(e),a(e),l(e)}))};a.a.render(Object(d.jsx)(l.Connector,{mqttProps:"ws://10.42.0.1:9001",children:Object(d.jsx)(M,{})}),document.getElementById("root")),P()},69:function(e,t){},71:function(e,t){}},[[169,1,2]]]);
//# sourceMappingURL=main.0abd6f01.chunk.js.map