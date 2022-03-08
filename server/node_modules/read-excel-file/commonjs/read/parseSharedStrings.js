"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseSharedStrings;

var _xlsx = require("../xml/xlsx");

function parseSharedStrings(content, xml) {
  if (!content) {
    return [];
  }

  return (0, _xlsx.getSharedStrings)(xml.createDocument(content));
}
//# sourceMappingURL=parseSharedStrings.js.map