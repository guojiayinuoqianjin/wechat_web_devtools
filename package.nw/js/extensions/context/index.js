!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(o,i,function(t){return e[t]}.bind(null,i));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=223)}({223:function(){let e=1,t={};window.__sandbox_map_=t,window.__subcontext_ready__=(e=>{const n=t[e];if(n)for(const e in n.global)n.iframe.contentWindow[e]=n.global[e]}),window.__subcontext_ready_to_evaluate__=(e=>{const o=t[e];o&&(o.ready=!0,o.evaluateScriptFile&&n(e,o.evaluateScriptFile))});const n=e=>{const n=t[e];if(n){const e=window.__global.document.createElement("script");e.src="/game/subcontext",n.iframe.contentWindow.document.head.appendChild(e)}},o=n=>{const o=window.__global.document.createElement("iframe"),i=(e=>`subcontext_${e}`)(e),r=window.__global.getNewWeixinJSBridge(i);return window.__global.WeixinJSBridgeMap[i]=r,t[e]={iframe:o,global:{WeixinJSContext:__WeixinJSContext,WeixinJSBridge:r,__wxConfig:__wxConfig},ready:!1,evaluateScriptFile:n},o.src=`/game/subcontext.html?id=${e}`,window.__global.document.getElementsByTagName("body")[0].appendChild(o),e++};__WeixinJSContext.create=o,__WeixinJSContext.destroy=(e=>{let n=t[e];n&&(delete t[e],n.iframe.remove())}),__WeixinJSContext.alloc=(()=>o()),__WeixinJSContext.evaluateScriptFile=((e,o)=>{const i=t[e];return i?(i.ready?n(e):i.evaluateScriptFile=o,1):0})}});