"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moviedbPromise = require("moviedb-promise");

var _config = _interopRequireDefault(require("config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var _default = new _moviedbPromise.MovieDb(process.env.TMDB3);

exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=tmdbController.js.map