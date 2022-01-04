"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Observer = /*#__PURE__*/function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.beforeAddToDbListeners = this.createObserver();
    this.afterAddToDbListeners = this.createObserver();
  }

  _createClass(Observer, [{
    key: "getBeforeAddToDbListeners",
    value: function getBeforeAddToDbListeners() {
      return this.beforeAddToDbListeners;
    }
  }, {
    key: "getAfterAddToDbListeners",
    value: function getAfterAddToDbListeners() {
      return this.afterAddToDbListeners;
    }
  }, {
    key: "createObserver",
    value: function createObserver() {
      var listeners = [];
      return {
        subscribe: function subscribe(cb) {
          listeners.push(cb);
          return function () {
            return listeners = listeners.filter(function (func) {
              return func !== cb;
            });
          };
        },
        publish: function publish(ev) {
          listeners.forEach(function (cb) {
            return cb(ev);
          });
        }
      };
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;