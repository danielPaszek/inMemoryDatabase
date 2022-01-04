"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _BaseDB = require("./dbs/BaseDB");

Object.keys(_BaseDB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BaseDB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseDB[key];
    }
  });
});

var _arrayDB = require("./dbs/arrayDB");

Object.keys(_arrayDB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _arrayDB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _arrayDB[key];
    }
  });
});

var _basicTreeDB = require("./dbs/basicTreeDB");

Object.keys(_basicTreeDB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _basicTreeDB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _basicTreeDB[key];
    }
  });
});

var _mapDB = require("./dbs/mapDB");

Object.keys(_mapDB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mapDB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapDB[key];
    }
  });
});

var _objectDB = require("./dbs/objectDB");

Object.keys(_objectDB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _objectDB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectDB[key];
    }
  });
});

var _treeDB = require("./dbs/treeDB");

Object.keys(_treeDB).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _treeDB[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _treeDB[key];
    }
  });
});

var _observer = require("./utils/observer");

Object.keys(_observer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _observer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _observer[key];
    }
  });
});

var _tree = require("./utils/tree");

Object.keys(_tree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tree[key];
    }
  });
});