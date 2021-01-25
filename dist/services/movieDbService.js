"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMoviesFromDatabase = getMoviesFromDatabase;
exports.writeToDB = writeToDB;

var _winston = require("winston");

var _logger = require("../helpers/logger");

var _movieModel = _interopRequireDefault(require("../mongoModels/movieModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * get movie curation for a user
 * @param {String} userId
 */
function getMoviesFromDatabase() {
  return _getMoviesFromDatabase.apply(this, arguments);
}

function _getMoviesFromDatabase() {
  _getMoviesFromDatabase = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _movieModel["default"].find({}).then(function (users) {
              return users;
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);

            _logger.logger.error("failed to retrieve user movies for automation");

            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _getMoviesFromDatabase.apply(this, arguments);
}

function writeToDB(_x, _x2, _x3) {
  return _writeToDB.apply(this, arguments);
}

function _writeToDB() {
  _writeToDB = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, results, type) {
    var playlist;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            playlist = type === 0 ? 'userPlaylists.weeklyPlaylists' : type === 1 ? 'userPlaylists.monthlyPlaylists' : 'userPlaylists.allTimePlaylists';
            _context2.next = 3;
            return _movieModel["default"].updateOne({
              _id: id
            }, {
              $set: _defineProperty({}, playlist, results)
            }).then(function (user) {
              return true;
            })["catch"](function (err) {
              _logger.logger.error("Failed to write to database: ".concat(err.message));

              throw err;
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _writeToDB.apply(this, arguments);
}
//# sourceMappingURL=movieDbService.js.map