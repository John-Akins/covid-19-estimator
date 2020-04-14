import express from 'express';
import { json, urlencoded } from 'body-parser';
import appRoute from './routes/app';
import logsRoute from './routes/logs';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(requestTime);

app.use('/api/v1/', appRoute);
app.use('/api/v1/logs', logsRoute);

export default app;
