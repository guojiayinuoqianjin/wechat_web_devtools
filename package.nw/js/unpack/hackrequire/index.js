!(function(e) {
  var t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    var r = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            i,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return i;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 2));
})([
  function(e, t) {
    e.exports = require("fs");
  },
  function(e, t) {
    e.exports = require("path");
  },
  function(e, t, n) {
    "use strict";
    const i = n(3);
    n(5), (e.exports = i);
  },
  function(e, t, n) {
    "use strict";
    const i = n(0),
      r = n(1),
      { getReader: s, splitPath: o } = n(4),
      c = i.readFileSync;
    i.readFileSync = function(e, t) {
      const [n, i, a] = o(e);
      if (!n || !a) return c.apply(this, arguments);
      const l = s(i);
      let u = a.replace(/\\/g, "/");
      u = r.posix.resolve(u);
      const f = l.getFile(u);
      let h;
      return (
        t
          ? "[object String]" === Object.prototype.toString.call(t) &&
            (h = { encoding: t, flag: "r" })
          : (h = { encoding: null, flag: "r" }),
        h && h.encoding ? f.toString(h.encoding) : f
      );
    };
    let a = 0;
    const l = process.getuid ? process.getuid() : 0,
      u = process.getgid ? process.getgid() : 0,
      f = Date.now(),
      h = i.statSync;
    i.statSync = function(e) {
      const [t, n, i] = o(e);
      if (!t) return h.apply(this, arguments);
      if (!i) {
        const e = h.apply(this, arguments);
        return Object.assign({}, e, {
          isFile: () => !1,
          isDirectory: () => !0,
          wxvpkg: !0
        });
      }
      const c = s(n);
      let p = i.replace(/\\/g, "/");
      p = r.posix.resolve(p);
      const d = c.stat(p);
      return {
        dev: 1,
        ino: ++a,
        mode: 33188,
        nlink: 1,
        uid: l,
        gid: u,
        rdev: 0,
        atime: d.atime || f,
        birthtime: d.birthtime || f,
        mtime: d.mtime || f,
        ctime: d.ctime || f,
        size: d.size,
        isFile: () => d.isFile,
        isDirectory: () => !d.isFile,
        isSymbolicLink: () => !1,
        isBlockDevice: () => !1,
        isCharacterDevice: () => !1,
        isFIFO: () => !1,
        isSocket: () => !1
      };
    };
    const p = i.existsSync;
    (i.existsSync = function(e) {
      const [t, n, i] = o(e);
      if (!t || !i) return p.apply(this, arguments);
      const c = s(n);
      let a = i.replace(/\\/g, "/");
      return (a = r.posix.resolve(a)), c.exists(a);
    }),
      (e.exports = {
        internalModuleReadFileSync: c,
        internalModuleStatSync: h,
        internalModuleExistSync: p
      });
  },
  function(e, t, n) {
    "use strict";
    const i = n(0),
      r = n(1),
      s = 14,
      o = 18;
    class c {
      constructor(e) {
        (this.fileMap = {}),
          (this.dirMap = {}),
          (this.cache = {}),
          (this._close = !0),
          (this.readSync = (e, t) => {
            this._close &&
              ((this._close = !1), (this.fd = i.openSync(this._path, "r")));
            const n = Buffer.alloc(t);
            return i.readSync(this.fd, n, 0, t, e), n;
          }),
          (this._path = e),
          (this._stat = i.statSync(e));
        const t = this.readSync(s, 4).readInt32BE(0);
        this.fileMap = this.getFileMap(t);
      }
      cacheDirName(e) {
        this.dirMap[e] ||
          ((this.dirMap[e] = !0), this.cacheDirName(r.dirname(e)));
      }
      getFileMap(e) {
        const t = {};
        let n = o;
        for (let i = 0; i < e; i++) {
          const e = {},
            i = this.readSync(n, 4).readInt32BE(0);
          (n += 4),
            (e.name = this.readSync(n, i).toString()),
            this.cacheDirName(r.dirname(e.name)),
            (n += i),
            (e.offset = this.readSync(n, 4).readInt32BE(0)),
            (n += 4),
            (e.length = this.readSync(n, 4).readInt32BE(0)),
            (n += 4),
            (t[e.name] = e);
        }
        return t;
      }
      getFile(e) {
        if (!this.cache[e]) {
          const t = this.fileMap[e];
          this.cache[e] = t
            ? this.readSync(t.offset, t.length)
            : Buffer.alloc(0);
        }
        return this.cache[e];
      }
      exists(e) {
        return !!this.fileMap[e] || !!this.dirMap[e];
      }
      stat(e) {
        const t = {
          atime: this._stat.atime,
          birthtime: this._stat.birthtime,
          mtime: this._stat.mtime,
          ctime: this._stat.ctime
        };
        if (this.fileMap[e])
          return Object.assign({}, t, {
            isFile: !0,
            size: this.fileMap[e].length || 0
          });
        if (this.dirMap[e])
          return Object.assign({}, t, { isFile: !1, size: 0 });
        throw new Error("no such file or directory");
      }
      close() {
        this._close || (i.close(this.fd, () => {}), (this.fd = void 0)),
          (this._close = !0);
      }
    }
    let a = {};
    e.exports = {
      splitPath: e => {
        if ("[object String]" !== Object.prototype.toString.call(e))
          return [!1, "", ""];
        if (".wxvpkg" === e.substr(-7)) return [!0, e, ""];
        const t = e.split(".wxvpkg");
        return 1 === t.length
          ? [!1, "", ""]
          : [
              !0,
              t.slice(0, t.length - 1).join(".wxvpkg") + ".wxvpkg",
              t[t.length - 1]
            ];
      },
      getReader: e => {
        let t = a[e];
        return t || (t = a[e] = new c(e)), t;
      },
      cleanCache: () => {
        for (const e in a) {
          a[e].close();
        }
        a = {};
      }
    };
  },
  function(e, t, n) {
    "use strict";
    const i = n(1),
      r = n(6),
      s = n(0),
      o = Object.create(null);
    function c(e) {
      const t = c.cache;
      if (null !== t) {
        const n = t.get(e);
        if (void 0 !== n) return n;
      }
      let n;
      if (s.existsSync(e)) {
        n = s.statSync(e).isDirectory() ? 1 : 0;
      } else n = -2;
      return null !== t && t.set(e, n), n;
    }
    function a(e, t) {
      return 0 === c(e) && i.resolve(e);
    }
    function l(e, t, n) {
      for (const n of t) {
        const t = a(e + n);
        if (t) return t;
      }
      return !1;
    }
    function u(e, t, n) {
      const r = (function(e) {
        const t = o[e];
        if (t) return t;
        const n = i.resolve(e, "package.json");
        try {
          const t = s.readFileSync(n, "utf8");
          return !!t && (o[e] = JSON.parse(t).main);
        } catch (e) {
          return !1;
        }
      })(e);
      if (!r) return !1;
      const c = i.resolve(e, r);
      return a(c) || l(c, t) || l(i.resolve(c, "index"), t);
    }
    c.cache = new Map();
    const f = r._findPath;
    r._findPath = function(e, t, n) {
      if (i.isAbsolute(e)) t = [""];
      else if (!t || 0 === t.length) return !1;
      const s = e + "\0" + (1 === t.length ? t[0] : t.join("\0")),
        o = r._pathCache[s];
      if (o) return o;
      let a,
        f = e.length > 0 && 47 === e.charCodeAt(e.length - 1);
      f || (f = /(?:^|\/)\.?\.$/.test(e));
      for (const n of t) {
        if (n && c(n) < 1) continue;
        const t = i.resolve(n, e);
        let o;
        const h = c(t);
        if (
          (f ||
            (0 === h && (o = i.resolve(t)),
            o ||
              (void 0 === a && (a = Object.keys(r._extensions)),
              (o = l(t, a)))),
          o ||
            1 !== h ||
            (void 0 === a && (a = Object.keys(r._extensions)),
            (o = u(t, a)) || (o = l(i.resolve(t, "index"), a))),
          o)
        )
          return (r._pathCache[s] = o), o;
      }
      return !1;
    };
    const h = r._resolveLookupPaths,
      p = "darwin" === process.platform,
      d = (function() {
        if (p)
          return i.join(
            i.dirname(process.argv[0]),
            "../../../../../Resources/package.nw/node_modules"
          );
        {
          const e = global.nw ? global.nw.App.manifest.name : "微信开发者工具";
          return i.join(
            process.env.APPDATA,
            "./Tencent",
            e,
            "./package.nw/node_modules"
          );
        }
      })();
    (r._resolveLookupPaths = function() {
      const e = h.apply(this, arguments),
        t = [];
      return (
        e.push(d),
        e.forEach(e => {
          "node_modules" === i.basename(e) &&
            t.push(i.join(i.dirname(e), "node_modules.wxvpkg")),
            t.push(e);
        }),
        t
      );
    }),
      (e.exports = {
        internalModuleFindPath: f,
        internalModuleResolveLookupPaths: h
      });
  },
  function(e, t) {
    e.exports = require("module");
  }
]);
