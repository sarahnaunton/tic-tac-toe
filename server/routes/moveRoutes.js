const express = require('express');
const router = express.Router();
const moveController = require('../controllers/moveController');

router.post('/', (req, res) => {
  return moveController.createMove(req, res);
});


module.exports = router;