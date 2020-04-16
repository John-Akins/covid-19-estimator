import responseUtility from '../utilities/responseUtility';
import db from '../db';

const logsController = {};

const logToText = (data) => {
  let textLog = '';
  data.forEach((log) => {
    textLog += ` ${log.timestamp} ${log.url} ${log.duration}  \n`;
  });
  return textLog;
};

logsController.getLoggedRequests = (req, res) => {
  db.query('SELECT * FROM logs')
    .then((data) => {
      const logText = logToText(data.rows);
      responseUtility.success(res, logText);
    })
    .catch(() => {
      responseUtility.error(res, 400, 'someting went wrong while processing your request');
    });
};

logsController.logNewRequest = (req) => {
  const { requestTime, baseUrl } = req;
  const duration = (Date.now() - requestTime) / 1000;

  const query = {
    text: 'INSERT INTO logs ("timestamp", "url", "duration") values  ($1, $2, $3)',
    values: [requestTime, baseUrl, duration]
  };

  db.query(query)
    .then(() => true)
    .catch(() => false);
};

export default logsController;
