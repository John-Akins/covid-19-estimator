"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logs = _interopRequireDefault(require("./logs"));

var _responseUtility = _interopRequireDefault(require("../utilities/responseUtility"));

var _estimator = _interopRequireDefault(require("../estimator"));

var _appUtilities = _interopRequireDefault(require("../utilities/appUtilities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultRegion = {
  name: 'Africa',
  avgAge: 19.7,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
};
const appController = {};

appController.makeEsimate = (req, res) => {
  const data = req.body;

  if (!req.body.region) {
    data.region = defaultRegion;
  }

  const inputValidator = _appUtilities.default.validateInput(data);

  if (inputValidator.success !== false) {
    const response = (0, _estimator.default)(data);

    _logs.default.logNewRequest(req, res);

    _responseUtility.default.success(res, response);
  } else {
    _responseUtility.default.error(res, inputValidator.message);
  }
};

var _default = appController;
exports.default = _default;
//# sourceMappingURL=app.js.map