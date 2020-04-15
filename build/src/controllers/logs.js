"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _responseUtility = _interopRequireDefault(require("../utilities/responseUtility"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logsController = {};

logsController.getLoggedRequests = (req, res) => {
  const query = {
    text: 'SELECT * FROM logs'
  };

  _db.default.query(query).then(data => {
    _responseUtility.default.success(res, data);
  }).catch(() => {
    _responseUtility.default.error(res, 400, 'someting went wrong while processing your request');
  });
};

logsController.logNewRequest = (req, res) => {
  const {
    requesTime,
    baseUrl
  } = req;
  const duration = (Date.now() - requesTime) / 1000;
  const query = {
    text: 'INSERT INTO logs ("timestamp", "url", "duration") values  ($1, $2, $3)',
    values: [requesTime, baseUrl, duration]
  };

  _db.default.query(query).then(response => {
    _responseUtility.default.success(res, response.rows);
  }).catch(() => _responseUtility.default.error(res, 400, 'someting went wrong while processing your request'));
};

var _default = logsController;
exports.default = _default;
//# sourceMappingURL=logs.js.map