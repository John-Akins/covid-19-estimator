import express from 'express';
import logsController  from '../controllers/logs';

const router = express.Router();

router.get('', logsController.getAll);

export default router;
