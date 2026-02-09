const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/', (req, res) => {
  return gameController.createGame(req, res);
});

router.patch('/:gameId/abandon', (req, res) => {
  return gameController.abandonGame(req, res);
});

router.patch('/:gameId/complete', (req, res) => {
  return gameController.completeGame(req, res);
});

module.exports = router;