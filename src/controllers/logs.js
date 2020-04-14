import responseUtility from '../utilities/responseUtility';
import db from '../db';

const logsController = {};

logsController.getLoggedRequests = (req, res) => {
  const query = {
    text: 'SELECT * FROM logs',
  };
  db.query(query)
    .then((data) => {
      responseUtility.success(res, data);
    })
    .catch((error) => {
      responseUtility.error(res, 400, 'someting went wrong while processing your request');
    });
};

logsController.logNewRequest = (req, res) => {
    const query = {
      text: 'INSERT INTO logs ("timestamp", "url") values  ($1, $2)',
      values: [1, 2],
    };
    db.query(query)
      .then((response) => {
        responseUtility.success(res, response.rows);
      })
      .catch((error) => responseUtility.error(res, 400, 'someting went wrong while processing your request'));
};

export default logsController;
