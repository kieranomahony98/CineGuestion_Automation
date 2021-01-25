"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _logger = require("./helpers/logger");

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _config = _interopRequireDefault(require("config"));

require("regenerator-runtime/runtime.js");

var _playlistApi = _interopRequireDefault(require("./routes/api/playlistApi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _helmet["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.listen(process.env.PORT, function () {
  _logger.logger.info("app is listening to port ".concat(process.env.PORT));
}); // connect to db

_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  _logger.logger.info('Mongoose successfully connected');
})["catch"](function (err) {
  _logger.logger.error(err);
});

app.get('/', function (req, res) {
  res.send('Welcome to babel node');
});
app.use('/api/playlist', _playlistApi["default"]);
//# sourceMappingURL=server.js.map