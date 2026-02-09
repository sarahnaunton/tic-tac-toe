const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/', (req, res) => {
  return gameController.createGame(req, res);
})


module.exports = router;