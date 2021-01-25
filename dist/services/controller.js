"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWeeklyPlaylist = getWeeklyPlaylist;
exports.getMonthlyPlaylistForUser = getMonthlyPlaylistForUser;
exports.getAllTimePlaylist = getAllTimePlaylist;
exports.doAll = doAll;

var _movieDbService = require("./movieDbService");

var _playlistGenerator = require("./playlistGenerator");

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _logger = require("../helpers/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_nodeCron["default"].schedule('0 0 0 * * 0', function () {
  var lastWeek = new Date().getTime() - 86400000 * 7;
  getWeeklyPlaylist(new Date(lastWeek).toISOString());
});

_nodeCron["default"].schedule('0 0 0 1 * *', function () {
  var thisMonth = new Date().getMonth();
  var lastMonth = thisMonth == 0 ? new Date().setMonth(11) : new Date().setMonth(thisMonth - 1);
  var date = new Date(lastMonth).toISOString();
  getMonthlyPlaylistForUser(date);
});

function userProcessing(_x, _x2, _x3) {
  return _userProcessing.apply(this, arguments);
}

function _userProcessing() {
  _userProcessing = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(allUsers, date, type) {
    var userPlaylists, _iterator, _step, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userPlaylists = [];
            _iterator = _createForOfIteratorHelper(allUsers);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                user = _step.value;
                userPlaylists.push((0, _playlistGenerator.getPlaylist)(user, date, type));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", Promise.all(userPlaylists));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _logger.logger.error("Failed to process users: ".concat(_context.t0.message));

            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _userProcessing.apply(this, arguments);
}

function playlistCreationController(_x4, _x5) {
  return _playlistCreationController.apply(this, arguments);
}

function _playlistCreationController() {
  _playlistCreationController = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(type, date) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _movieDbService.getMoviesFromDatabase)().then(function (allUsers) {
              return userProcessing(allUsers, date, type);
            }).then(function (playlists) {
              return playlists;
            })["catch"](function (err) {
              _logger.logger.error("Failed to get weekly playlists: ".concat(err.message));

              throw err;
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _playlistCreationController.apply(this, arguments);
}

function getWeeklyPlaylist() {
  return _getWeeklyPlaylist.apply(this, arguments);
}

function _getWeeklyPlaylist() {
  _getWeeklyPlaylist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var lastWeek;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            lastWeek = new Date().getTime() - 86400000 * 7;
            _context3.next = 3;
            return playlistCreationController(0, new Date(lastWeek).toISOString()).then(function (playlists) {
              return playlists;
            })["catch"](function (err) {
              _logger.logger.error("Failed to get playlists: ".concat(err.message));
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getWeeklyPlaylist.apply(this, arguments);
}

function getMonthlyPlaylistForUser() {
  return _getMonthlyPlaylistForUser.apply(this, arguments);
}

function _getMonthlyPlaylistForUser() {
  _getMonthlyPlaylistForUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var date;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            date = new Date();
            date = date.setMonth(date.getMonth() - 1);
            return _context4.abrupt("return", playlistCreationController(1, new Date(date).toISOString()).then(function (playlists) {
              return playlists;
            })["catch"](function (err) {
              _logger.logger.error("Failed to get playlists: ".concat(err.message));

              throw err;
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getMonthlyPlaylistForUser.apply(this, arguments);
}

function getAllTimePlaylist() {
  return _getAllTimePlaylist.apply(this, arguments);
}

function _getAllTimePlaylist() {
  _getAllTimePlaylist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return playlistCreationController(2, null).then(function (playlists) {
              return playlists;
            })["catch"](function (err) {
              _logger.logger.error("Failed to get playlists: ".concat(err.message));
            });

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getAllTimePlaylist.apply(this, arguments);
}

function doAll() {
  return _doAll.apply(this, arguments);
}

function _doAll() {
  _doAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getMonthlyPlaylistForUser();

          case 2:
            _context6.next = 4;
            return getAllTimePlaylist();

          case 4:
            _context6.next = 6;
            return getWeeklyPlaylist();

          case 6:
            return _context6.abrupt("return", true);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _doAll.apply(this, arguments);
}
//# sourceMappingURL=controller.js.map