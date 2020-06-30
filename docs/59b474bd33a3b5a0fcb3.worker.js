!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/mask_simulation/",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function i(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}n.r(t);var u={isStasisReached:!1,isRunning:!1,tick:0,maxTicks:1e3,positionNodes:[],virusSimulations:[],width:0,height:0},d=0,f=1,l=2,m=0,y=1;function p(e){var t=e.attackSuccessProbability,n=void 0===t?.6:t,r=e.height,o=void 0===r?500:r,s=e.nNodes,l=void 0===s?0:s,p=e.radius,v=void 0===p?7:p,h=e.virusSimulations,b=void 0===h?[]:h,g=e.ticksToRecover,O=void 0===g?1e3:g,k=e.velocity,S=void 0===k?8:k,j=e.width,R=void 0===j?500:j;u.width=R,u.height=o,u.tick=0,u.isRunning=!0,u.isStasisReached=!1,u.positionNodes=function(e,t,n,r,o){return i(new Array(e)).map((function(e,i){return{index:i,common_random_value:Math.random(),x:Math.random()*t*.9+o,y:Math.random()*n*.9+o,xVelocity:(Math.random()-.5)*r,yVelocity:(Math.random()-.5)*r,radius:o}}))}(l,R,o,S,v),u.ticksToRecover=O,u.virusSimulations=b.map((function(e){var t=e.maskedType,r=void 0===t?y:t,o=e.nInfected,s=void 0===o?1:o,u=e.percentMasked,p=void 0===u?0:u,v=e.maskTransmissionReduction,h=void 0===v?{}:v,b=c(e,["maskedType","nInfected","percentMasked","maskTransmissionReduction"]),g=function(e,t,n,r,o){return i(new Array(e)).map((function(e,i){return{index:i,ticks_infected:0,disease_status:i+1>t?n:d,mask_status:i<o?r:m}}))}(l,s,f,r,p/100*l);return a(a({},b),{},{maskedType:r,nInfected:s,maskTransmissionReduction:h,percentMasked:p,shouldInfect:function(e,t,r){var i=t.mask_status,o=r.mask_status;return e<=n*h[i]*h[o]},virusNodes:g})}))}function v(){if(u.isRunning&&!u.isStasisReached){var e=u,t=e.positionNodes,n=e.virusSimulations;u.isStasisReached=!0,r=t,i=u.width,o=u.height,r.forEach((function(e){return function(e,t,n){e.common_random_value=Math.random(),(e.x+e.radius>t||e.x-e.radius<0)&&(e.xVelocity=-e.xVelocity),(e.y+e.radius>n||e.y-e.radius<0)&&(e.yVelocity=-e.yVelocity),e.x+=e.xVelocity,e.y+=e.yVelocity}(e,i,o)})),n.forEach((function(e){var n=e.virusNodes,r=e.shouldInfect;(function(e,t,n){var r={},i=0;return e.forEach((function(n,o){t[o].disease_status===d&&(i++,t[o].ticks_infected++,t[o].ticks_infected>u.ticksToRecover&&(t[o].disease_status=l,t[o].ticks_infected=0),e.forEach((function(e,i){t[i].disease_status===f&&Math.abs(n.x-e.x)<e.radius&&Math.abs(n.y-e.y)<e.radius&&(r[o]=r[o]||[],r[o].push(i))})))})),Object.keys(r).forEach((function(i){r[i].forEach((function(r){n(e[t[i].index].common_random_value,t[i],t[r])&&(t[r].disease_status=d)}))})),0!==i})(t,n,r)&&(u.isStasisReached=!1)})),u.tick++}var r,i,o}self.addEventListener("message",(function(e){var t=e.data,n=t.action,r=c(t,["action"]);switch(n){case"PAUSE":u.isRunning=!1;break;case"RESUME":u.isRunning=!0;break;case"NEW_SIMULATION":u=a(a({},u),r),p(r);break;case"TICK":v();break;case"RESIZE":var i=r.width,o=r.height;u.width=i,u.height=o,p(u)}!function(){var e=u,t=e.isStasisReached,n=e.isRunning,r=e.positionNodes,i=e.tick,o=e.virusSimulations;postMessage({isStasisReached:t,isRunning:n,positionNodes:r,tick:i,virusSimulations:(void 0===o?[]:o).map((function(e){e.shouldInfect;return c(e,["shouldInfect"])}))})}()})),addEventListener("message",(function(e){var n,r=e.data,i=r.type,o=r.method,s=r.id,a=r.params;"RPC"===i&&o&&((n=t[o])?Promise.resolve().then((function(){return n.apply(t,a)})):Promise.reject("No such method")).then((function(e){postMessage({type:"RPC",id:s,result:e})})).catch((function(e){var t={message:e};e.stack&&(t.message=e.message,t.stack=e.stack,t.name=e.name),postMessage({type:"RPC",id:s,error:t})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=59b474bd33a3b5a0fcb3.worker.js.map