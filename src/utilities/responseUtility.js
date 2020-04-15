export default {
  success: (res, data = {}) => {
    res.status(200).json(data);
  },
  error: (res, code, msg) => res.status(code).json({
    error: msg
  })
};
