import { Client } from 'pg';

require('dotenv').config();

const connection = {};

connection.String = process.env.DB_URL;

const client = new Client({ connectionString: connection.String });

client.connect();

const db = {};

db.query = queryString => new Promise((resolve, reject) => {
  client.query(queryString, (err, result) => {
    if (err) {
      reject(new Error({ msg: 'Error executing query', data: err.stack }));
    }
    resolve(result);
  });
});

export default db;
//# sourceMappingURL=index.js.map