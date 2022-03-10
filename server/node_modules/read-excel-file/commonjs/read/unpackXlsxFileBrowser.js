"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unpackXlsxFile;

var _jszip = _interopRequireDefault(require("jszip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Reads XLSX file in a browser.
 * @param  {file} file - A file being uploaded in the browser.
 * @return {Promise} Resolves to an object holding XLSX file entries.
 */
function unpackXlsxFile(file) {
  var files = {};
  return _jszip["default"].loadAsync(file).then(function (zip) {
    var files = [];
    zip.forEach(function (relativePath, zipEntry) {
      if (!zipEntry.dir) {
        files.push(zipEntry.name);
      }
    });
    var entries = {};
    return Promise.all(files.map(function (file) {
      return zip.file(file).async('string').then(function (content) {
        return entries[file] = content;
      });
    })).then(function () {
      return entries;
    });
  });
}
//# sourceMappingURL=unpackXlsxFileBrowser.js.map