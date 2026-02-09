import express from 'express';
import * as gameController from '../controllers/gameController';

const router = express.Router();

router.post('/', gameController.createGame);
router.patch('/:gameId/abandon', gameController.abandonGame);
router.patch('/:gameId/complete', gameController.completeGame);

export default router;

