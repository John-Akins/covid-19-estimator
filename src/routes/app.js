import express from 'express';
import appController from '../controllers/app';

const router = express.Router();

router.post('/', appController.makeEsimate);

export default router;
