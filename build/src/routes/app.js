"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _app = _interopRequireDefault(require("../controllers/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _app.default.makeEsimate);
var _default = router;
exports.default = _default;
//# sourceMappingURL=app.js.map