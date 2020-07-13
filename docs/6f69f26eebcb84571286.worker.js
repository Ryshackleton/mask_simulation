!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/mask_simulation/",r(r.s=0)}([function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}function i(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||o(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var d,f,l,y,v;r.r(e);var m=0,p=1,h=2,b=0,g=1,S=2,k=0,O=1,j=2,_=(a(d={},k,1),a(d,O,.67),a(d,j,.55),a(f={},b,"#BB641D"),a(f,g,"#AAC6CA"),a(f,S,"#CB8AC0"),a(l={},b,"Infected"),a(l,g,"Healthy"),a(l,S,"Recovered"),a(y={},k,0),a(y,O,3),a(y,j,4),a(v={},k,"#fff"),a(v,O,"#000"),a(v,j,"#000"),g),w=b,P=S,x=m,I=p,M=h,A={runState:p,tick:0,maxTicks:1e3,percentSociallyDistant:0,positionNodes:[],virusSimulations:[],width:0,height:0,historyInterval:3};function T(t){var e=t.attackSuccessProbability,r=void 0===e?.6:e,n=t.height,o=void 0===n?500:n,a=t.historyInterval,s=void 0===a?A.historyInterval:a,d=t.nNodes,f=void 0===d?0:d,l=t.percentSociallyDistant,y=void 0===l?0:l,v=t.radius,m=void 0===v?7:v,p=t.virusSimulations,h=void 0===p?[]:p,g=t.ticksToRecover,S=void 0===g?1e3:g,j=t.velocity,w=void 0===j?8:j,P=t.width,x=void 0===P?500:P;A.width=x,A.height=o,A.tick=0,A.runState=I;var M=Math.ceil(y/100*f);A.positionNodes=function(t,e,r,n,o,a){return i(new Array(t)).map((function(i,s){return{index:s,common_random_value:Math.random(),x:Math.random()*e*.9+o,y:Math.random()*r*.9+o,xVelocity:t-s<a?0:(Math.random()-.5)*n,yVelocity:t-s<a?0:(Math.random()-.5)*n,radius:o}}))}(f,x,o,w,m,M),A.percentSociallyDistant=y,A.historyInterval=s,A.ticksToRecover=S,A.virusSimulations=h.map((function(t){var e=t.maskedType,n=void 0===e?O:e,o=t.nInfected,a=void 0===o?1:o,s=t.percentMasked,d=void 0===s?0:s,l=t.maskTransmissionReduction,y=void 0===l?{}:l,v=c(t,["maskedType","nInfected","percentMasked","maskTransmissionReduction"]),m=function(t,e,r,n,o){return i(new Array(t)).map((function(t,i){return{index:i,ticks_infected:0,disease_status:i+1>e?r:b,mask_status:i<o?n:k}}))}(f,a,_,n,d/100*f);return u(u({},v),{},{virusHistory:[E(m)],maskedType:n,nInfected:a,maskTransmissionReduction:y,percentMasked:d,shouldInfect:function(t,e,n){var o=e.mask_status,i=n.mask_status;return t<=r*y[o]*y[i]},virusNodes:m})}))}function E(t){for(var e,r=(a(e={tick:A.tick},w,0),a(e,_,0),a(e,P,0),e),n=0;n<t.length;++n)r[t[n].disease_status]++;return r}function R(){if(A.runState===x){var t=A,e=t.positionNodes,r=t.virusSimulations;A.runState=M,function(t,e,r){for(var n=0;n<t.length;++n)N(t[n],e,r)}(e,A.width,A.height),A.tick++,r.forEach((function(t){var r=t.virusHistory,n=t.virusNodes,i=t.shouldInfect;(function(t,e,r){for(var n=new Set,i=0,a=0;a<e.length;++a)if(e[a].disease_status===b){e[a].ticks_infected++,e[a].ticks_infected>A.ticksToRecover?(e[a].disease_status=S,e[a].ticks_infected=0):i++;for(var s=0;s<t.length;s++)a!==s&&e[s].disease_status===g&&Math.sqrt((t[a].x-t[s].x)*(t[a].x-t[s].x)+(t[a].y-t[s].y)*(t[a].y-t[s].y))<t[a].radius+t[s].radius&&r(t[a].common_random_value,e[a],e[s])&&n.add(s)}var u,c=function(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=o(t))){var e=0,r=function(){};return{s:r,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i,a=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){s=!0,i=t},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw i}}}}(n);try{for(c.s();!(u=c.n()).done;){var d=u.value;e[d].disease_status=b,e[d].ticks_infected=0,i++}}catch(f){c.e(f)}finally{c.f()}return 0!==i})(e,n,i)&&(A.runState=x,A.tick%A.historyInterval===0&&r.push(E(n)))}))}}function N(t,e,r){t.common_random_value=Math.random(),(t.x+t.radius>e||t.x-t.radius<0)&&(t.xVelocity=-t.xVelocity),(t.y+t.radius>r||t.y-t.radius<0)&&(t.yVelocity=-t.yVelocity),t.x+=t.xVelocity,t.y+=t.yVelocity}self.addEventListener("message",(function(t){var e=t.data,r=e.action,n=c(e,["action"]);switch(r){case"PAUSE":A.runState=I;break;case"RESUME":A.runState=x;break;case"NEW_SIMULATION":A=u(u({},A),n),T(n);break;case"TICK":R();break;case"RESIZE":var o=n.width,i=n.height;A.width=o,A.height=i,T(A)}!function(){var t=A,e=t.runState,r=t.positionNodes,n=t.tick,o=t.virusSimulations;postMessage({positionNodes:r,runState:e,tick:n,virusSimulations:(void 0===o?[]:o).map((function(t){t.shouldInfect;return c(t,["shouldInfect"])}))})}()})),addEventListener("message",(function(t){var r,n=t.data,o=n.type,i=n.method,a=n.id,s=n.params;"RPC"===o&&i&&((r=e[i])?Promise.resolve().then((function(){return r.apply(e,s)})):Promise.reject("No such method")).then((function(t){postMessage({type:"RPC",id:a,result:t})})).catch((function(t){var e={message:t};t.stack&&(e.message=t.message,e.stack=t.stack,e.name=t.name),postMessage({type:"RPC",id:a,error:e})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=6f69f26eebcb84571286.worker.js.map