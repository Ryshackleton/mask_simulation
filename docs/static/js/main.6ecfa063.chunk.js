(this.webpackJsonpmask_simulation=this.webpackJsonpmask_simulation||[]).push([[0],{24:function(e,t,a){var n=a(73),o=[];e.exports=function(){var e=new Worker(a.p+"6043f2e3986a01f68e58.worker.js",{name:"[hash].worker.js"});return n(e,o),e}},66:function(e,t,a){e.exports=a(78)},71:function(e,t,a){},72:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(23),s=a.n(i),c=(a(71),a(1)),r=(a(72),a(3));function u(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}var l,m,h,d,v,f=a(24),b=a.n(f),E=a(2),O={INFECTED:0,SUSCEPTIBLE:1,RECOVERED:2},g=0,j=1,p=2,k=(l={},Object(E.a)(l,g,1),Object(E.a)(l,j,.67),Object(E.a)(l,p,.55),l),w=(m={},Object(E.a)(m,O.INFECTED,"#BB641D"),Object(E.a)(m,O.SUSCEPTIBLE,"#AAC6CA"),Object(E.a)(m,O.RECOVERED,"#CB8AC0"),m),M=(h={},Object(E.a)(h,O.INFECTED,"Infected"),Object(E.a)(h,O.SUSCEPTIBLE,"Healthy"),Object(E.a)(h,O.RECOVERED,"Recovered"),h),N=(d={},Object(E.a)(d,g,0),Object(E.a)(d,j,3),Object(E.a)(d,p,4),d),y=(v={},Object(E.a)(v,g,"#fff"),Object(E.a)(v,j,"#000"),Object(E.a)(v,p,"#000"),v),S={attackSuccessProbability:.05,historyInterval:3,nNodes:60,radius:7,ticksToRecover:1e3,velocity:3.5},C={title:"",maskedType:j,nInfected:3,percentMasked:0,maskTransmissionReduction:k},R=function(e){var t=e.disease_status;return w[t]},T=function(e){var t=e.mask_status;return y[t]},I=function(e){var t=e.mask_status;return N[t]};function x(e,t,a,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:2;e.beginPath(),e.arc(t.x,t.y,t.radius-(o?o/2:0),0,2*Math.PI,!1),o>0&&(e.save(),e.strokeStyle=n||"none",e.lineWidth=o,e.stroke(),e.restore()),e.fillStyle=a,e.strokeStyle=n||"none",e.fill()}function P(){}function A(e){var t=e.onClick,a=e.className,i=e.drawFunction,s=void 0===i?function(){}:i,r=e.height,u=void 0===r?500:r,l=e.width,m=void 0===l?500:l,h=e.canvasPixelRatio,d=void 0===h?2:h,v=e.onMouseDown,f=e.onMouseMove,b=e.onMouseUp,E=e.style,O=void 0===E?{}:E,g=e.onTouchEnd,j=e.onTouchMove,p=e.onTouchStart,k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=Object(n.useRef)(null);return Object(n.useEffect)((function(){var n=a.current,o=n.getContext("2d");var i=requestAnimationFrame((function(){o.clearRect(0,0,n.width,n.height),o.save(),o.scale(t,t),e(o),o.restore()}));return function(){return cancelAnimationFrame(i)}}),[e,t]),a}(s,d),w={width:"".concat(m,"px"),height:"".concat(u,"px")};return o.a.createElement("canvas",{className:a,width:m*d,height:u*d,style:Object(c.a)(Object(c.a)({},w),O),ref:k,onTouchStart:p,onTouchMove:j,onTouchEnd:g,onMouseMove:f,onMouseDown:v,onMouseUp:b,onClick:t})}a(74);var D=a(5),B=(a(75),O.INFECTED),L=O.SUSCEPTIBLE,U=O.RECOVERED;function F(e){var t=e.handleMouseMove,a=e.handleTouchMove,i=e.handleMouseLeave,s=e.height,c=e.margin,u=void 0===c?{top:5,left:5,bottom:5,right:5}:c,l=e.transitionDuration,m=void 0===l?1e3:l,h=e.virusHistory,d=e.nNodes,v=e.width,f=Object(n.useMemo)((function(){for(var e=2*String(h.length).length||1,t=[],a=0;a<h.length;a+=e)t.push(h[a]);return[t]}),[h]),b=Object(r.a)(f,1)[0],E=Object(n.useMemo)((function(){return[s-u.top-u.bottom,v-u.left-u.right]}),[v,s,u]),O=Object(r.a)(E,2),g=O[0],j=O[1],p=Object(n.useMemo)((function(){if(b.length){var e=Math.max(b[b.length-1].tick,2e3);return Object(D.b)().domain([0,e]).range([0,j])}return Object(D.b)()}),[b,j]),k=Object(n.useMemo)((function(){return Object(D.b)().domain([0,d]).range([g,0])}),[d,g]),M=Object(n.useMemo)((function(){return Object(D.d)().keys([B,L,U])(b)}),[b]),N=Object(n.useRef)();return Object(n.useLayoutEffect)((function(){var e=Object(D.a)().x((function(e){return p(e.data.tick)})).y0((function(e){return k(e[0])})).y1((function(e){return k(e[1])}));Object(D.c)(N.current).selectAll("path").data(M).join("path").attr("d",e).attr("fill",(function(e){var t=e.key;return w[t]}))}),[M,N,m,p,k]),o.a.createElement("div",{className:"stacked-area-chart-wrapper"},o.a.createElement("svg",{onMouseMove:t,onTouchMove:a,onMouseLeave:i,onTouchEnd:i,height:"100%",width:"100%",viewBox:"0 0 ".concat(v," ").concat(s),preserveAspectRatio:"none",overflow:"hidden"},o.a.createElement("g",{transform:"translate(".concat(u.left,", ").concat(u.top,")"),ref:N})))}a(76);var H=Object.values(O).reverse();function _(e){var t=e.height,a=e.virusHistory,n=a&&a.length?a[a.length-1]:{};return o.a.createElement("div",{className:"virus-count-container",style:{height:t}},H.map((function(e){return o.a.createElement("span",{key:e,style:{color:w[e]},className:"virus-count-label"},M[e],": ",o.a.createElement("strong",null,n[e]))})))}var W=function(e){var t=e.positionNodes,a=void 0===t?[]:t,n=e.virusNodes,o=void 0===n?[]:n;return function(e){return function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:R,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:T,i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:I;t.forEach((function(t,s){return x(e,t,n(a[s]),o(a[s]),i(a[s]))}))}(e,a,o)}};function V(e){var t=e.simulationState,a=(t=void 0===t?{}:t).isRunning,i=t.isStasisReached,s=t.positionNodes,c=void 0===s?[]:s,r=t.tick,u=t.virusSimulations,l=t.height,m=void 0===l?400:l,h=e.handleClick,d=Object(n.useMemo)((function(){return i?"(touch to start a new simulation)":!0===a?"(touch to pause simulation)":!1===a&&0===r?"(touch to start simulation)":!1===a?"(touch to resume simulation)":""}),[a,i,r]);return o.a.createElement("div",{className:"multi-simulation-container"},u&&u.map((function(e,t){var a=e.title,n=e.percentMasked,i=e.virusHistory,s=e.virusNodes;return o.a.createElement("div",{className:"simulation-group-container",key:"sim-canvas-".concat(t)},o.a.createElement("div",{className:"simulation-canvas-labels",onClick:h},o.a.createElement("span",{className:"simulation-title"},a||"".concat(n,"% mask use")),o.a.createElement("span",{className:"interaction-label"},d)),o.a.createElement("div",{className:"simulation-canvas-wrapper"},o.a.createElement(A,{className:"simulation-canvas",drawFunction:W({positionNodes:c,virusNodes:s}),onClick:h,ontouchend:h,height:m,width:m})),o.a.createElement("div",{className:"stacked-area-with-labels-container"},o.a.createElement(_,{virusHistory:i,height:60}),o.a.createElement(F,{nNodes:s.length,virusHistory:i,height:60,width:m})))})))}function J(e){var t=e.simulationProps,a=void 0===t?Object(c.a)(Object(c.a)({},S),{},{virusSimulations:[Object(c.a)(Object(c.a)({},C),{},{title:"No mask use"})]}):t,i=e.height,s=void 0===i?400:i,l=e.margin,m=void 0===l?{top:20,left:20,bottom:20,right:20}:l,h=e.width,d=void 0===h?400:h,v=Object(n.useState)({}),f=Object(r.a)(v,2),E=f[0],O=f[1],g=Object(n.useMemo)((function(){var e=d>600?2:1,t=Math.min(s-m.top-m.bottom,(d-(m.left-m.right)*e)/e);return[t,t]}),[s,d,m]),j=Object(r.a)(g,2),p=j[0],k=j[1],w=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:P,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,o=Object(n.useState)(null),i=Object(r.a)(o,2),s=i[0],l=i[1];return u((function(){s&&s.postMessage({action:"TICK"})}),a),Object(n.useEffect)((function(){if(!s){var a=new b.a;a.postMessage(Object(c.a)({action:"NEW_SIMULATION"},e)),a.addEventListener("message",(function(e){t(e.data)})),l(a)}}),[s,l,t,e]),[s,l]}(Object(c.a)({height:p,width:k},a),O),M=Object(r.a)(w,1)[0];Object(n.useEffect)((function(){M&&M.postMessage({action:"RESIZE",height:p,width:k})}),[p,k,M]);var N=Object(n.useCallback)((function(){E.isStasisReached?M.postMessage(Object(c.a)({action:"NEW_SIMULATION",height:p,width:k},a)):!0===E.isRunning?M.postMessage({action:"PAUSE"}):!1===E.isRunning&&M.postMessage({action:"RESUME"})}),[M,p,k,a,E]);return o.a.createElement(V,{simulationState:E,handleClick:N,height:p,width:k})}a(77);function q(e){var t=e.simulationProps;return o.a.createElement("div",{className:"mask-simulation-container"},o.a.createElement(J,{simulationProps:t}))}var K=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"section"},o.a.createElement("h2",{className:"title"},"Basic probability based transmission model"),o.a.createElement("div",{className:"editorial-text"},"This simulation demonstrates the concepts that mask use in the general population helps flatten the curve by lowering the overall rate of virus transmission.  If we take a base transmission rate of 5% probability of virus transmision in nodes that come in contact, we see the following scenario."),o.a.createElement("div",{className:"editorial-text"},o.a.createElement("strong",null,"Click/touch the gray box to start/stop/reset simulations")),o.a.createElement(q,{simulationProps:Object(c.a)(Object(c.a)({},S),{},{virusSimulations:[Object(c.a)(Object(c.a)({},C),{},{title:"5% transmission, no masks",percentMasked:0})]})})),o.a.createElement("div",{className:"section"},o.a.createElement("h2",{className:"title"},"Masks vs no masks"),o.a.createElement("div",{className:"editorial-text"},"Now lets run two simulations like the one above that have the same contacts for each node and the same transmission probabilities, but now we'll add masks to one simulation. ",o.a.createElement("strong",null,"Masked individuals are denoted by the black outlined circles.")," Here we assume that the masks reduce the probability of virus transmission by 33% for both the infected person and the healthy person. See how the model changes."),o.a.createElement(q,{simulationProps:Object(c.a)(Object(c.a)({},S),{},{virusSimulations:[Object(c.a)(Object(c.a)({},C),{},{title:"No mask use",percentMasked:0}),Object(c.a)(Object(c.a)({},C),{},{title:"95% mask use",percentMasked:95})]})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[66,1,2]]]);
//# sourceMappingURL=main.6ecfa063.chunk.js.map