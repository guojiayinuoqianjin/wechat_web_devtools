'use strict';var evalCode=self.eval;self.onmessage=(a)=>{if(a.data)switch(a.data.type){case'run':{evalCode(a.data.code);break}case'triggerOnMsg':{WeixinWorker.appServiceMsgHandler(a.data.msg);break}}};