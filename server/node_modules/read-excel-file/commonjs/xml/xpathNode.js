"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _xpath = _interopRequireDefault(require("xpath"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The `xpath` dependency is about as large as `jszip`.
function _default(document, node, path) {
  var namespaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var select = _xpath["default"].useNamespaces(namespaces);

  return select(path, node || document);
}
//# sourceMappingURL=xpathNode.js.map