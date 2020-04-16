"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _responseUtility = _interopRequireDefault(require("../utilities/responseUtility"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logsController = {};

const logToText = data => {
  let textLog = '';
  data.forEach(log => {
    textLog += ` ${log.timestamp} ${log.url} ${log.duration}  \n`;
  });
  return textLog;
};

logsController.getLoggedRequests = (req, res) => {
  _db.default.query('SELECT * FROM logs').then(data => {
    const logText = logToText(data.rows);

    _responseUtility.default.success(res, logText);
  }).catch(() => {
    _responseUtility.default.error(res, 400, 'someting went wrong while processing your request');
  });
};

logsController.logNewRequest = req => {
  const {
    requestTime,
    baseUrl
  } = req;
  const duration = (Date.now() - requestTime) / 1000;
  const query = {
    text: 'INSERT INTO logs ("timestamp", "url", "duration") values  ($1, $2, $3)',
    values: [requestTime, baseUrl, duration]
  };

  _db.default.query(query).then(() => true).catch(() => false);
};

var _default = logsController;
exports.default = _default;
//# sourceMappingURL=logs.js.map