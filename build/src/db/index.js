"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

require('dotenv').config();

const env = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV.trim();
const connection = {};
connection.String = env === 'development' ? process.env.DB_DEV_URL : process.env.DB_TEST_URL;
const client = new _pg.Client({
  connectionString: connection.String
});
client.connect();
const db = {};

db.query = queryString => new Promise((resolve, reject) => {
  client.query(queryString, (err, result) => {
    if (err) {
      reject(new Error({
        msg: 'Error executing query',
        data: err.stack
      }));
    }

    resolve(result);
  });
});

var _default = db;
exports.default = _default;
//# sourceMappingURL=index.js.map