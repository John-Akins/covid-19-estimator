import express from 'express';
import logsController from '../controllers/logs';

const router = express.Router();

router.get('', logsController.getLoggedRequests);

export default router;
