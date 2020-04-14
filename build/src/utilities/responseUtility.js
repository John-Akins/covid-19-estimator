"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable linebreak-style */
var _default = {
  success: (res, data) => {
    res.status(200).json({
      status: 'success',
      data
    });
  },
  error: (res, code, msg) => res.status(code).json({
    status: 'error',
    error: msg
  })
};
exports.default = _default;
//# sourceMappingURL=responseUtility.js.map