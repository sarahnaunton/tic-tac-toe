import express from 'express';
import * as playerController from '../controllers/playerController';

const router = express.Router();

router.get('/', playerController.getPlayers);
router.get('/:playerId', playerController.getPlayerById);
router.post('/', playerController.createPlayer);

export default router;

