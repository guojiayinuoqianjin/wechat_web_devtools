'use strict';require('../js/unpack/hackrequire/index.js');const CORE_PATH='../core.wxvpkg';function init(){const a=require(CORE_PATH + '/84b183688a46c9e2626d3e6f83365e13.js'),b=document.getElementById('webview'),c=a.getQuery(location.search),d=require(CORE_PATH + '/f5a748840b272d2bf0223c95f6c8dbe3.js');d.initPlugin(c.pluginid,b),global.windowMap.get('MAIN').window.postMessage('PLUGIN_READY','*')}'complete'===document.readyState?init():document.addEventListener('DOMContentLoaded',init),window.onerror=function(a){document.body.innerText=a.toString()};