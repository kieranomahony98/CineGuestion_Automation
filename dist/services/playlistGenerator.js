"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlaylist = getPlaylist;

var _genres = require("../helpers/genres");

var _logger = require("../helpers/logger");

var _tmdbController = _interopRequireDefault(require("./tmdbController"));

var _movieDbService = require("./movieDbService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function filterMovies(_x, _x2) {
  return _filterMovies.apply(this, arguments);
}

function _filterMovies() {
  _filterMovies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(movies, date) {
    var leaderBoard, moviesThisWeek, _iterator, _step, generation, _i, _Object$entries, _Object$entries$_i, key, value, values, _iterator2, _step2, _value;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            leaderBoard = {
              with_genres: {},
              with_keywords: {},
              sort_by: {}
            };
            moviesThisWeek = !date ? movies : movies.filter(function (movieGeneration) {
              if (movieGeneration.movieGenerationDate >= date) {
                return movieGeneration.movieSearchCriteria;
              }
            });
            _context.prev = 2;
            _iterator = _createForOfIteratorHelper(moviesThisWeek);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                generation = _step.value;

                for (_i = 0, _Object$entries = Object.entries(generation.movieSearchCriteria); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];

                  if (value !== undefined && value != "" && leaderBoard.hasOwnProperty(key)) {
                    values = key === 'with_genres' || key === 'with_keywords' ? generation.movieSearchCriteria[key].split(",") : [value];
                    _iterator2 = _createForOfIteratorHelper(values);

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        _value = _step2.value;
                        leaderBoard[key][_value] = leaderBoard[key][_value] ? leaderBoard[key][_value] + 1 : 1;
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](2);

            _logger.logger.error("failed to filter movies: ".concat(_context.t0));

            throw _context.t0;

          case 11:
            return _context.abrupt("return", {
              leaderBoard: leaderBoard,
              count: moviesThisWeek.length
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 7]]);
  }));
  return _filterMovies.apply(this, arguments);
}

function normiliseData(_x3) {
  return _normiliseData.apply(this, arguments);
}

function _normiliseData() {
  _normiliseData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var leaderBoard, count, characteristic, value;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            leaderBoard = _ref.leaderBoard, count = _ref.count;
            _context2.prev = 1;

            for (characteristic in leaderBoard) {
              for (value in leaderBoard[characteristic]) {
                leaderBoard[characteristic][value] = leaderBoard[characteristic][value] / count;
              }
            }

            return _context2.abrupt("return", leaderBoard);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);

            _logger.logger.error("Failed to normalise data: ".concat(_context2.t0.message));

            throw _context2.t0;

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 6]]);
  }));
  return _normiliseData.apply(this, arguments);
}

function compareData(_x4) {
  return _compareData.apply(this, arguments);
}

function _compareData() {
  _compareData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(leaderBoard) {
    var comparedData, _i2, _Object$entries2, _Object$entries2$_i, key, value, _i3, _Object$entries3, _Object$entries3$_i, _k, v;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            comparedData = {
              with_genres: {
                k: null,
                k2: null,
                v: 0,
                v2: 0
              },
              with_keywords: {
                k: null,
                v: 0
              },
              sort_by: {
                k: null,
                v: 0
              }
            };
            _i2 = 0, _Object$entries2 = Object.entries(leaderBoard);

          case 2:
            if (!(_i2 < _Object$entries2.length)) {
              _context3.next = 23;
              break;
            }

            _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];
            _context3.prev = 4;

            if (!leaderBoard.hasOwnProperty(key)) {
              _context3.next = 14;
              break;
            }

            _i3 = 0, _Object$entries3 = Object.entries(leaderBoard[key]);

          case 7:
            if (!(_i3 < _Object$entries3.length)) {
              _context3.next = 14;
              break;
            }

            _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), _k = _Object$entries3$_i[0], v = _Object$entries3$_i[1];

            if (key === 'with_genres') {
              if (v > comparedData[key].v) {
                comparedData[key].k = _k;
                comparedData[key].v = v;
              } else {
                if (v > comparedData[key].v2) {
                  comparedData[key].k2 = _k;
                  comparedData[key].v2 = v;
                }
              }
            } else {
              if (v > comparedData[key].v) {
                comparedData[key].k = _k;
                comparedData[key].v = v;
              }
            }

            return _context3.abrupt("continue", 11);

          case 11:
            _i3++;
            _context3.next = 7;
            break;

          case 14:
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](4);

            _logger.logger.error("Failed to compare data: ".concat(_context3.t0.message));

            throw _context3.t0;

          case 20:
            _i2++;
            _context3.next = 2;
            break;

          case 23:
            return _context3.abrupt("return", comparedData);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 16]]);
  }));
  return _compareData.apply(this, arguments);
}

function createQuery(_x5) {
  return _createQuery.apply(this, arguments);
}

function _createQuery() {
  _createQuery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref2) {
    var with_genres, with_keywords, sort_by, queryObj, mostPopularGenre, _iterator3, _step3, c, _ref5, _ref6, key, value;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            with_genres = _ref2.with_genres, with_keywords = _ref2.with_keywords, sort_by = _ref2.sort_by;
            _context4.prev = 1;
            queryObj = {
              with_genres: with_genres.k ? with_genres.k : null,
              with_keywords: with_keywords.k,
              sort_by: sort_by.k
            };
            mostPopularGenre = with_genres.k2 ? with_genres.k2 : with_genres.k ? k : null;

            if (!mostPopularGenre) {
              _context4.next = 23;
              break;
            }

            _iterator3 = _createForOfIteratorHelper(_genres.matchedGenres[mostPopularGenre]);
            _context4.prev = 6;

            _iterator3.s();

          case 8:
            if ((_step3 = _iterator3.n()).done) {
              _context4.next = 15;
              break;
            }

            c = _step3.value;

            if (!(mostPopularGenre !== c)) {
              _context4.next = 13;
              break;
            }

            queryObj.with_genres = with_genres ? "".concat(queryObj.with_genres, ",").concat(c) : null;
            return _context4.abrupt("break", 15);

          case 13:
            _context4.next = 8;
            break;

          case 15:
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](6);

            _iterator3.e(_context4.t0);

          case 20:
            _context4.prev = 20;

            _iterator3.f();

            return _context4.finish(20);

          case 23:
            for (_ref5 in Object.entries(queryObj)) {
              _ref6 = _slicedToArray(_ref5, 2);
              key = _ref6[0];
              value = _ref6[1];

              if (!value) {
                delete queryObj[key];
              }
            }

            return _context4.abrupt("return", queryObj);

          case 27:
            _context4.prev = 27;
            _context4.t1 = _context4["catch"](1);

            _logger.logger.error("Failed to create query: ".concat(_context4.t1.message));

            throw _context4.t1;

          case 31:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 27], [6, 17, 20, 23]]);
  }));
  return _createQuery.apply(this, arguments);
}

function revisedQuery(_x6) {
  return _revisedQuery.apply(this, arguments);
}

function _revisedQuery() {
  _revisedQuery = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref3) {
    var with_genres, with_keywords, sort_by, keywordsList;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            with_genres = _ref3.with_genres, with_keywords = _ref3.with_keywords, sort_by = _ref3.sort_by;

            if (!(with_keywords.split(",").length > 1)) {
              _context5.next = 5;
              break;
            }

            keywordsList = with_keywords.split(",");
            keywordsList.splice(-1, 1);
            return _context5.abrupt("return", {
              with_genres: with_genres,
              sort_by: sort_by,
              with_keywords: keywordsList.toString()
            });

          case 5:
            if (!sort_by) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", {
              with_genres: with_genres
            });

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _revisedQuery.apply(this, arguments);
}

function makeRequest(_x7) {
  return _makeRequest.apply(this, arguments);
}

function _makeRequest() {
  _makeRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(queryObj) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _tmdbController["default"].discoverMovie(queryObj).then(function (movies) {
              if (movies.results) {
                return movies.results.filter(function (movie, index) {
                  return index <= 8;
                });
              }
            })["catch"](function (err) {
              _logger.logger.error("Failed to make request: ".concat(err.message));

              throw err;
            });

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _makeRequest.apply(this, arguments);
}

function filterRequest(_x8) {
  return _filterRequest.apply(this, arguments);
}

function _filterRequest() {
  _filterRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(queryObj) {
    var movieResults;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return makeRequest(queryObj).then(function (movies) {
              if (!movies) {
                return null;
              }

              return movies;
            })["catch"](function (err) {
              _logger.logger.error("Failed to make request: ".concat(err.message));

              throw err;
            });

          case 2:
            movieResults = _context7.sent;
            _context7.prev = 3;

            if (movieResults) {
              _context7.next = 12;
              break;
            }

            _context7.t0 = filterRequest;
            _context7.next = 8;
            return revisedQuery(queryObj);

          case 8:
            _context7.t1 = _context7.sent;
            _context7.next = 11;
            return (0, _context7.t0)(_context7.t1);

          case 11:
            return _context7.abrupt("return", _context7.sent);

          case 12:
            return _context7.abrupt("return", {
              movieResults: movieResults,
              queryObj: queryObj
            });

          case 15:
            _context7.prev = 15;
            _context7.t2 = _context7["catch"](3);

            _logger.logger.error("Failed to filter request: ".concat(_context7.t2.message));

            throw _context7.t2;

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 15]]);
  }));
  return _filterRequest.apply(this, arguments);
}

function filterResults(_x9) {
  return _filterResults.apply(this, arguments);
}

function _filterResults() {
  _filterResults = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref4) {
    var movieResults, queryObj, _ref7, _ref8, key, value, movieRetun;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            movieResults = _ref4.movieResults, queryObj = _ref4.queryObj;
            _context9.prev = 1;

            for (_ref7 in Object.entries(queryObj)) {
              _ref8 = _slicedToArray(_ref7, 2);
              key = _ref8[0];
              value = _ref8[1];

              if (!value) {
                delete queryObj[key];
              }
            }

            _context9.next = 5;
            return Promise.all(movieResults.map( /*#__PURE__*/function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(movie) {
                var genres;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return (0, _genres.listMatcher)(movie.genre_ids);

                      case 2:
                        genres = _context8.sent;
                        return _context8.abrupt("return", {
                          movieId: movie.id,
                          movieTitle: movie.title,
                          movieDescription: movie.overview,
                          movieReleaseYear: movie.release_date ? movie.release_date.split('-')[0] : undefined,
                          movieGenres: genres,
                          moviePopularity: movie.vote_average ? "".concat(movie.vote_average * 10, "%") : 'This movie has no votes',
                          movieImagePath: movie.poster_path
                        });

                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x13) {
                return _ref9.apply(this, arguments);
              };
            }()));

          case 5:
            movieRetun = _context9.sent;
            return _context9.abrupt("return", {
              movieGenerationDate: new Date().toISOString(),
              movieSearchCriteria: queryObj,
              movies: movieRetun
            });

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](1);

            _logger.logger.error("Failed to format movies ".concat(_context9.t0));

            throw _context9.t0;

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 9]]);
  }));
  return _filterResults.apply(this, arguments);
}

function getPlaylist(_x10, _x11, _x12) {
  return _getPlaylist.apply(this, arguments);
}

function _getPlaylist() {
  _getPlaylist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(user, lastWeek, type) {
    var id;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = user._id;
            return _context10.abrupt("return", filterMovies(user.userMovies, lastWeek).then(function (leaderboardObj) {
              return normiliseData(leaderboardObj);
            }).then(function (leaderboard) {
              return compareData(leaderboard);
            }).then(function (sortedData) {
              return createQuery(sortedData);
            }).then(function (queryObj) {
              return filterRequest(queryObj);
            }).then(function (results) {
              return filterResults(results);
            }).then(function (sortedMovies) {
              return (0, _movieDbService.writeToDB)(id, sortedMovies, type);
            }).then(function (moviesWritten) {
              return moviesWritten;
            })["catch"](function (err) {
              _logger.logger.error(err.message);

              throw err;
            }));

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _getPlaylist.apply(this, arguments);
}
//# sourceMappingURL=playlistGenerator.js.map