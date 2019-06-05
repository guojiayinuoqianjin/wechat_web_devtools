"use strict";
require("../js/unpack/hackrequire/index.js");
const CORE_PATH = "../core.wxvpkg",
  tools = require(CORE_PATH + "/84b183688a46c9e2626d3e6f83365e13.js"),
  locales = require(CORE_PATH + "/2ecd9245a65446da4e50831e85e3b27f.js"),
  isMac = "darwin" === process.platform;
function initGlobal() {
  const a = require(CORE_PATH + "/9172561b0b10d8ce715be906748879d7.js");
  a.initGlobal(global, nw.Window.get()),
    a.preventDefault(document),
    a.initCli(global);
  const b = global.Win;
  if (
    (global.windowMap.set("LOGIN", b),
    b.on("close", () => {
      const a = require(CORE_PATH + "/881e653f19d837f2408386047cb8c38c.js");
      a.notifyCloseWindow(),
        setTimeout(() => {
          b.close(!0);
        }, 1e3);
    }),
    Object.defineProperties(global.worker, {
      bbsLogWorker: {
        get() {
          return (
            this._bbsLogWoker ||
              (this._bbsLogWoker = new Worker(
                "../js/unpack/workers/bbslog.js"
              )),
            this._bbsLogWoker
          );
        }
      }
    }),
    location.search)
  ) {
    const a = tools.getQuery(location.search);
    switch (
      ((global.isDevWindow = !0),
      (global.devType = location.search.match(/devtype=(.*?)(&|$)/)[1]),
      global.devType)
    ) {
      case "webdebugger": {
        global.devInfo.id = a.devid;
        break;
      }
      default:
        if (
          ((global.devInfo.id = a.devid),
          (global.devInfo.appid = a.appid),
          (global.devInfo.projectname = a.projectname),
          (global.devInfo.projectpath = a.projectpath),
          (global.devInfo.projectid = encodeURIComponent(
            decodeURIComponent(a.projectid)
          )),
          (global.devInfo.isTemp = !!a.isTemp),
          (global.devInfo.isOnline = !!a.isOnline),
          global.devInfo.isTemp)
        ) {
          const a = `temp_${global.devInfo.appid}_${
            global.devInfo.projectname
          }`;
          (global.devInfo.project = JSON.parse(localStorage[a])),
            delete localStorage[a];
        }
    }
    a.simple &&
      ((global.isSimple = !0),
      (global.userInfo = {
        openid: a.openid,
        nickName: a.nickName,
        headUrl: a.headUrl,
        contry: a.contry,
        city: a.city,
        loginStatus: a.loginStatus,
        province: a.province,
        sex: a.sex,
        newticket: a.newticket,
        ticketExpiredTime: parseInt(a.ticketExpiredTime),
        signature: a.signature,
        signatureExpiredTime: parseInt(a.signatureExpiredTime)
      }));
  }
}
function initMenu() {
  try {
    if (global.isDevWindow || isMac) {
      const a = new nw.Menu({ type: "menubar" }),
        b = new nw.Menu(),
        c = new nw.Menu();
      c.append(
        new nw.MenuItem({
          label: locales.config.MENU_INSPECT_APP,
          click: () => global.Win.showDevTools()
        })
      ),
        b.append(
          new nw.MenuItem({ label: locales.config.MENU_INSPECT, submenu: c })
        ),
        b.append(
          new nw.MenuItem({
            label: locales.config.CLOSE_WINDOW,
            click: () => global.Win.close(!0)
          })
        ),
        b.append(
          new nw.MenuItem({
            label: locales.config.MENU_EXIT,
            click: () => nw.App.quit()
          })
        ),
        a.append(
          new nw.MenuItem({ label: locales.config.MENU_TITLE_APP, submenu: b })
        ),
        (global.Win.menu = a);
    }
  } catch (a) {}
}
function init() {
  if ((initGlobal(), initMenu(), global.isSimple))
    require(CORE_PATH + "/8524207e9ea0bd06cec5e97c74bd6b7d.js");
  else {
    const a = require(CORE_PATH + "/5f3c86137d346ddffec99d08c1ac2bb0.js")
      .default;
    a.start(), require(CORE_PATH + "/29cbb96f0d87ca0a3ee63c5dbbd8107c.js");
  }
}
init();
