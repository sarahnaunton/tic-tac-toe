import express from 'express';
import * as moveController from '../controllers/moveController';

const router = express.Router();

router.post('/', moveController.createMove);

export default router;

