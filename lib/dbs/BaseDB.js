"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDB = void 0;

var _observer = require("../utils/observer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BaseDB = /*#__PURE__*/function () {
  function BaseDB() {
    var observer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _observer.Observer();

    _classCallCheck(this, BaseDB);

    this.pubSub = observer;
  }

  _createClass(BaseDB, [{
    key: "subscribe",
    value: function subscribe() {
      return {
        AddBeforeAddToDb: this.pubSub.getBeforeAddToDbListeners().subscribe,
        AddAfterAddToDb: this.pubSub.getAfterAddToDbListeners().subscribe
      };
    }
  }, {
    key: "print",
    value: function print() {
      this.visit(function (item) {
        return console.log(item);
      });
    }
  }]);

  return BaseDB;
}();

exports.BaseDB = BaseDB;