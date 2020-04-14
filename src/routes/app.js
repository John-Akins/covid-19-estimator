import express from 'express';
import appController from '../controllers/app';

const router = express.Router();

router.post('/', appController.makeComputation);

export default router;
