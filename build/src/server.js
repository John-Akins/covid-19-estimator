"use strict";

var _http = _interopRequireDefault(require("http"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Node native http package
_dotenv.default.config(); // returns a valid port
// whether port is passed as number or a string


const normalizePort = val => {
  const port = parseInt(val, 10); // eslint-disable-next-line no-restricted-globals

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '8080');

_app.default.set('port', port);

const server = _http.default.createServer(_app.default); // checks for various errors and handles them appropriately,
// also registers them to the server


const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;

    case 'EADDRINUSE':
      process.exit(1);
      break;

    default:
      throw error;
  }
};

server.on('error', errorHandler); // set server to listen with either production or local port

server.listen(port);
//# sourceMappingURL=server.js.map