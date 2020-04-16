"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  success: (res, data = {}) => {
    res.status(200).json(data);
  },
  error: (res, code, msg) => res.status(code).json({
    error: msg
  })
};
exports.default = _default;
//# sourceMappingURL=responseUtility.js.map