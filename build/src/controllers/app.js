"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _responseUtility = _interopRequireDefault(require("../utilities/responseUtility"));

var _estimator = _interopRequireDefault(require("../estimator"));

var _logs = _interopRequireDefault(require("logs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appController = {};

appController.makeEsimate = (req, res) => {
  const {
    data
  } = req.body;
  const response = (0, _estimator.default)(data);

  _logs.default.logNewRequest(req, res);

  _responseUtility.default.success(res, response);
};

var _default = appController;
exports.default = _default;
//# sourceMappingURL=app.js.map