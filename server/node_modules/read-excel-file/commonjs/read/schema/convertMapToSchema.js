"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = convertMapToSchema;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function convertMapToSchema(map) {
  var schema = {};

  for (var _i = 0, _Object$keys = Object.keys(map); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var prop = map[key];
    var type = void 0;

    if (_typeof(prop) === 'object') {
      prop = Object.keys(map[key])[0];
      type = convertMapToSchema(map[key][prop]);
    }

    schema[key] = {
      prop: prop
    };

    if (type) {
      schema[key].type = type;
    }
  }

  return schema;
}
//# sourceMappingURL=convertMapToSchema.js.map