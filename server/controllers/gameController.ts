import { Request, Response } from 'express';
import { models, sequelize } from '../db';

interface PlayerSymbolBody {
  playerId: string;
  symbol: string;
}

export async function createGame(
  req: Request<{}, {}, { boardSize?: number; playerSymbols?: PlayerSymbolBody[] }>,
  res: Response
): Promise<Response> {
  try {
    const { boardSize, playerSymbols } = req.body;

     if (!boardSize || !Number.isInteger(boardSize) || boardSize < 3 || boardSize > 15) {
      return res.status(400).json({ error: 'Board size is required and must be a number between 3 and 15 inclusive' });
    }

    if (!Array.isArray(playerSymbols) || playerSymbols.length === 0) {
      return res.status(400).json({ error: 'No players and their symbols have been provided' });
    }

    const seenPlayerIds = new Set<string>();
    const seenSymbols = new Set<string>();
    for (const ps of playerSymbols) {
      if (
        ps == null ||
        typeof ps !== 'object' ||
        ps.playerId == null ||
        ps.symbol == null
      ) {
        return res.status(400).json({
          error: 'Each playerSymbols entry must be an object with both playerId and symbol',
        });
      }
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
      const createdGame = await models.game.create({ boardSize }, { transaction });
      const gamePlayers = await models.gamePlayer.bulkCreate(
        playerSymbols.map((ps) => ({
          gameId: createdGame.get('id') as string,
          playerId: ps.playerId,
          symbol: ps.symbol,
        })),
        { transaction }
      );

      return {
        ...createdGame.toJSON(),
        gamePlayers: gamePlayers.map((gp) => gp.toJSON()),
      };
    });
    return res.status(201).json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function abandonGame(
  req: Request<{ gameId: string }>,
  res: Response
): Promise<Response> {
  try {
    const { gameId } = req.params;
    const game = await models.game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    await game.update({ status: 'ABANDONED' });

    return res.status(200).json(game.get({ plain: true }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function completeGame(
  req: Request<
    { gameId: string },
    object,
    { outcome?: 'WIN' | 'DRAW'; winnerPlayerId?: string }
  >,
  res: Response
): Promise<Response> {
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

    if (outcome === 'WIN') {
      const gamePlayer = await models.gamePlayer.findOne({ where: { gameId: game.get('id') as string, playerId: winnerPlayerId } });
      if (!gamePlayer) {
        return res.status(403).json({ error: 'Player is not in this game' });
      }
    }

    await game.update({
      status: 'COMPLETED',
      outcome,
      completedAt: new Date(),
      winnerPlayerId: outcome === 'WIN' ? winnerPlayerId : null,
    });

    return res.status(200).json(game.get({ plain: true }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
