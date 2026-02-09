const { models,  } = require('../db');

async function createMove(req, res) {
  try {
    const { gameId, playerId, positionRow, positionColumn, moveNumber } = req.body;

    if (!gameId || !playerId || !moveNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (typeof positionRow !== 'number' || typeof positionColumn !== 'number' || Number.isNaN(positionRow) || Number.isNaN(positionColumn)) {
      return res.status(400).json({ error: 'positionRow and positionColumn must be numbers' });
    }

    const gamePlayer = await models.gamePlayer.findOne({ where: { gameId, playerId } });
    if (!gamePlayer) {
      return res.status(403).json({ error: 'Player is not in this game' });
    }

    const move = await models.move.create({ gameId, playerId, positionRow, positionColumn, moveNumber });

    return res.status(201).json(move);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createMove,
};