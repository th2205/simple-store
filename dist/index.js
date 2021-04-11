"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Store = /*#__PURE__*/function () {
  function Store(state) {
    _classCallCheck(this, Store);

    _defineProperty(this, "events", {});

    _defineProperty(this, "state", {});

    this.state = state;
  }

  _createClass(Store, [{
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "on",
    value: function on(state, fn) {
      if (!this.events.hasOwnProperty(state)) {
        this.events[state] = [fn];
      } else {
        this.events[state] = [].concat(_toConsumableArray(this.events[state]), [fn]);
      }
    }
  }, {
    key: "set",
    value: function set(data) {
      var events = this.events;
      var keys = Object.keys(data);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];

        if (data[key] !== this.state[key]) {
          this.state[key] = data[key];
          events[key].forEach(function (fn) {
            fn();
          });
        }
      }
    }
  }]);

  return Store;
}();