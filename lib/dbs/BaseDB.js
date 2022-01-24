"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDB = void 0;

var _filter = require("src/utils/filter");

var _observer = require("src/utils/observer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BaseDB = /*#__PURE__*/function () {
  function BaseDB() {
    var observer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _observer.Observer();
    var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _filter.Filter();

    _classCallCheck(this, BaseDB);

    this.pubSub = observer;
    this.filter = filter;
  }

  _createClass(BaseDB, [{
    key: "getFilter",
    value: function getFilter() {
      return this.filter;
    }
  }, {
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
          newValue: item,
          happenedAt: new Date()
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
            accessedValue: result,
            happenedAt: new Date()
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
        var result = this._pop(item);

        if (result) {
          this.pubSub.getRemoveFromDbListeners().publish({
            removeValue: result,
            happenedAt: new Date()
          });
        } else throw new Error("poped value is undefined");

        return result;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }]);

  return BaseDB;
}();

exports.BaseDB = BaseDB;