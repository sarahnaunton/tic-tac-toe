const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', (req, res) => {
  return playerController.getPlayers(req, res)
})
router.get('/:playerId', (req, res) => {
  return playerController.getPlayer(req, res)
})
router.post('/', (req, res) => {
  return playerController.createPlayer(req, res)
})

module.exports = router