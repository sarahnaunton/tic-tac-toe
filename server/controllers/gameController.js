const { models, sequelize } = require('../db')

async function createGame(req, res) {
  try {
    const { boardSize, playerSymbols } = req.body;

    if (!boardSize || typeof boardSize !== 'number') {
      return res.status(400).json({ error: 'Board size is required and must be a number' });
    }

    if (!Array.isArray(playerSymbols) || playerSymbols.length === 0) {
      return res.status(400).json({ error: 'playerSymbols must be a non-empty array' });
    }

    const seenPlayerIds = new Set();
    const seenSymbols = new Set();
    for (const ps of playerSymbols) {
      if (seenPlayerIds.has(ps.playerId)) {
        return res.status(400).json({ error: 'Each player can only appear once in a game' });
      }
      if (seenSymbols.has(ps.symbol)) {
        return res.status(400).json({ error: 'Each symbol can only be used once per game' });
      }
      seenPlayerIds.add(ps.playerId);
      seenSymbols.add(ps.symbol);
    }

    const game = await sequelize.transaction(async (transaction) => {
      const createdGame = await models.game.create({ boardSize: req.body.boardSize }, { transaction });
      await models.gamePlayer.bulkCreate(
        playerSymbols.map((ps) => ({
          gameId: createdGame.id,
          playerId: ps.playerId,
          symbol: ps.symbol
        })),
        { transaction }
      )

      return createdGame
    });
    return res.status(201).json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createGame,
};