"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDB = void 0;

var _observerNext = require("src/utils/observerNext");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BaseDB = /*#__PURE__*/function () {
  function BaseDB() {
    var observer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _observerNext.NextObserver();

    _classCallCheck(this, BaseDB);

    this.pubSub = observer;
  }

  _createClass(BaseDB, [{
    key: "subscribe",
    value: function subscribe() {
      return {
        PushToDbListeners: this.pubSub.getPushToDbListeners().subscribe,
        RemoveFromDbListeners: this.pubSub.getRemoveFromDbListeners().subscribe,
        GetFromDbListeners: this.pubSub.getGetFromDbListeners().subscribe
      };
    }
  }, {
    key: "push",
    value: function push(item) {
      try {
        this._push(item);

        this.pubSub.getPushToDbListeners().publish({
          newValue: item
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: "get",
    value: function get(id) {
      try {
        var result = this._get(id);

        if (result) {
          this.pubSub.getGetFromDbListeners().publish({
            accessedValue: result
          });
          return result;
        } else {
          throw new Error("accessed value is undefined");
        }
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }, {
    key: "print",
    value: function print() {
      this.visit(function (item) {
        return console.log(item);
      });
    }
  }, {
    key: "pop",
    value: function pop(item) {
      try {
        this._pop(item);
      } catch (error) {}
    }
  }]);

  return BaseDB;
}();

exports.BaseDB = BaseDB;