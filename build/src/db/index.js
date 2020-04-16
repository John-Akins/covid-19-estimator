"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

require('dotenv').config();

const connection = {};
connection.String = process.env.DB_URL;
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