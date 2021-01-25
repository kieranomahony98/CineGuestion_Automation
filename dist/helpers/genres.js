"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listMatcher = listMatcher;
exports.stringMatcher = stringMatcher;
exports.matchedGenres = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var movieGenreOBJ = {
  '37': 'Western',
  '28': 'Action',
  '12': 'Adventure',
  '16': 'Animation',
  '35': 'Comedy',
  '80': 'Crime',
  '99': 'Documentary',
  '18': 'Drama',
  '10751': 'Family',
  '14': 'Fantasy',
  '36': 'History',
  '27': 'Horror',
  '10402': 'Music',
  '9648': 'Mystery',
  '10749': 'Romance',
  '878': 'Sci-Fi',
  '10770': 'TV Movie',
  '53': 'Thriller',
  '10752': 'War'
};
var matchedGenres = {
  '28': ['18', '12', '53'],
  '12': ['10752', '80', '10749'],
  '16': ['35', '28', '18'],
  '35': ['53', '10751', '18']
};
exports.matchedGenres = matchedGenres;

function listMatcher(_x) {
  return _listMatcher.apply(this, arguments);
}

function _listMatcher() {
  _listMatcher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(movieGenres) {
    var genres;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (movieGenres) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", '');

          case 2:
            genres = movieGenres.toString().split(",");
            return _context.abrupt("return", genreMatcher(genres));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _listMatcher.apply(this, arguments);
}

function stringMatcher(_x2) {
  return _stringMatcher.apply(this, arguments);
}

function _stringMatcher() {
  _stringMatcher = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(movieGenres) {
    var genres;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (movieGenres) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", 'All Genres');

          case 2:
            ;
            genres = movieGenres.split(",");
            return _context2.abrupt("return", genreMatcher(genres));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _stringMatcher.apply(this, arguments);
}

function genreMatcher(genres) {
  var returnGenres = '';

  var _iterator = _createForOfIteratorHelper(genres),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var genre = _step.value;
      returnGenres += movieGenreOBJ[genre] ? returnGenres.length === 0 ? "".concat(movieGenreOBJ[genre]) : ", ".concat(movieGenreOBJ[genre]) : null;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnGenres;
}
//# sourceMappingURL=genres.js.map