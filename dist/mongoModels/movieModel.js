"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var MovieSchema = new Schema({
  userId: String,
  userMovies: [{
    movieGenerationDate: {
      type: String,
      required: true
    },
    movieSearchCriteria: {
      sort_by: {
        type: String,
        required: false
      },
      with_genres: {
        type: String,
        required: false
      },
      primary_release_year: {
        type: String,
        required: false
      },
      with_keywords: {
        type: String,
        required: false
      }
    },
    movies: [{
      movieId: {
        type: Number,
        required: true
      },
      movieTitle: {
        type: String,
        required: true
      },
      movieImagePath: {
        type: String,
        required: true
      },
      movieDescription: {
        type: String,
        required: true
      },
      movieReleaseYear: {
        type: String,
        required: false
      },
      movieGenres: {
        type: String,
        required: true
      },
      moviePopularity: {
        type: String,
        required: false
      }
    }]
  }],
  userPlaylists: {
    type: {
      weeklyPlaylists: {
        type: {
          movieGenerationDate: {
            type: String,
            required: true
          },
          movieSearchCriteria: {
            sort_by: {
              type: String,
              required: false
            },
            with_genres: {
              type: Array,
              required: false
            },
            primary_release_year: {
              type: String,
              required: false
            },
            with_keywords: {
              type: String,
              required: false
            }
          },
          movies: [{
            movieId: {
              type: Number,
              required: true
            },
            movieTitle: {
              type: String,
              required: true
            },
            movieImagePath: {
              type: String,
              required: true
            },
            movieDescription: {
              type: String,
              required: true
            },
            movieReleaseYear: {
              type: String,
              required: false
            },
            movieGenres: {
              type: String,
              required: true
            },
            moviePopularity: {
              type: String,
              required: false
            }
          }]
        },
        required: false
      },
      monthlyPlaylists: {
        type: {
          movieGenerationDate: {
            type: String,
            required: true
          },
          movieSearchCriteria: {
            sort_by: {
              type: String,
              required: false
            },
            with_genres: {
              type: Array,
              required: false
            },
            primary_release_year: {
              type: String,
              required: false
            },
            with_keywords: {
              type: String,
              required: false
            }
          },
          movies: [{
            movieId: {
              type: Number,
              required: true
            },
            movieTitle: {
              type: String,
              required: true
            },
            movieImagePath: {
              type: String,
              required: true
            },
            movieDescription: {
              type: String,
              required: true
            },
            movieReleaseYear: {
              type: String,
              required: false
            },
            movieGenres: {
              type: String,
              required: true
            },
            moviePopularity: {
              type: String,
              required: false
            }
          }]
        },
        required: false
      },
      allTimePlaylists: {
        type: {
          movieGenerationDate: {
            type: String,
            required: true
          },
          movieSearchCriteria: {
            sort_by: {
              type: String,
              required: false
            },
            with_genres: {
              type: Array,
              required: false
            },
            primary_release_year: {
              type: String,
              required: false
            },
            with_keywords: {
              type: String,
              required: false
            }
          },
          movies: [{
            movieId: {
              type: Number,
              required: true
            },
            movieTitle: {
              type: String,
              required: true
            },
            movieImagePath: {
              type: String,
              required: true
            },
            movieDescription: {
              type: String,
              required: true
            },
            movieReleaseYear: {
              type: String,
              required: false
            },
            movieGenres: {
              type: String,
              required: true
            },
            moviePopularity: {
              type: String,
              required: false
            }
          }]
        },
        required: false
      },
      required: false
    }
  }
});

var _default = _mongoose["default"].model('movies', MovieSchema);

exports["default"] = _default;
module.exports = exports.default;
//# sourceMappingURL=movieModel.js.map