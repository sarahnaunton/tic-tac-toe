const { models, sequelize } = require('../db')

async function createGame(req, res) {
  try {
    const { boardSize, playerSymbols } = req.body;

    if (!boardSize || typeof boardSize !== 'number') {
      return res.status(400).json({ error: 'Board size is required and must be a number' });
    }

    if (!Array.isArray(playerSymbols) || playerSymbols.length === 0) {
      return res.status(400).json({ error: 'No players and their symbols have been provided' });
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
      const createdGame = await models.game.create({ boardSize }, { transaction })
      const gamePlayers = await models.gamePlayer.bulkCreate(
        playerSymbols.map((ps) => ({
          gameId: createdGame.id,
          playerId: ps.playerId,
          symbol: ps.symbol
        })),
        { transaction }
      )

      return {
        ...createdGame.toJSON(),
        gamePlayers: gamePlayers.map((gp) => gp.toJSON())
      }
    })
    return res.status(201).json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function abandonGame(req, res) {
  try {
    const game = await models.game.findByPk(req.params.gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    await game.update({ status: 'ABANDONED' });
    return res.status(200).json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function completeGame(req, res) {
  try {
    const { outcome, winnerPlayerId } = req.body;
    if (!outcome || !['WIN', 'DRAW'].includes(outcome)) {
      return res.status(400).json({ error: 'outcome must be WIN or DRAW' });
    }
    if (outcome === 'WIN' && !winnerPlayerId) {
      return res.status(400).json({ error: 'winnerPlayerId is required when outcome is WIN' });
    }
    const game = await models.game.findByPk(req.params.gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    await game.update({ status: 'COMPLETED', outcome, completedAt: new Date(), winnerPlayerId });
    return res.json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createGame,
  abandonGame,
  completeGame,
};