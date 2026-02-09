import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import { models } from '../db';
import { GameAttributes } from '../db/models/game';
import { GamePlayerAttributes } from '../db/models/gamePlayer';
import { PlayerAttributes } from '../db/models/player';

type CreatePlayerBody = Omit<PlayerAttributes, 'id'>;

interface PlayerStats {
  wins: number;
  draws: number;
  losses: number;
}

export async function getPlayers(
  req: Request<{}, {}, {}, { username?: string }>, 
  res: Response
): Promise<Response> {
  try {
    const whereClause: WhereOptions = {};
   
    if (typeof req.query.username === 'string') {
      const normalisedUsername = req.query.username.trim().toLowerCase();
      whereClause.username = { [Op.iLike]: normalisedUsername };
    }
    
    const response = await models.player.findAll({ where: whereClause, raw: true });
    
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createPlayer(
  req: Request<{}, {}, CreatePlayerBody>, 
  res: Response
): Promise<Response> {
  try {
    const { username } = req.body;
    if (!username || username.trim() === '') {
      return res.status(400).json({ error: 'Username is missing' });
    }

    const trimmedUsername = username.trim();
    const normalisedUsername = trimmedUsername.toLowerCase();

    const existing = await models.player.findOne({
      where: { username: { [Op.iLike]: normalisedUsername } },
    });
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const player = await models.player.create({ username: trimmedUsername });

    return res.status(201).json(player.get({ plain: true }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getPlayerById(
  req: Request<{ playerId: string }, {}, {}, { includeStats?: string }>,
  res: Response
): Promise<Response> {
  try {
    const { playerId } = req.params;
    const player = await models.player.findByPk(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const response = { ...player.get({ plain: true }) };

    if (req.query.includeStats === 'true') {
      const gamePlayers = await models.gamePlayer.findAll({ where: { playerId } });
      const gameIds = gamePlayers.map((gp) => (gp.get({ plain: true }) as GamePlayerAttributes).gameId);

      if (gameIds.length > 0) {
        const games = await models.game.findAll({
          where: {
            id: { [Op.in]: gameIds },
            status: 'COMPLETED',
          },
        });
        const gamesPlain: GameAttributes[] = games.map((g) => g.get({ plain: true }) as GameAttributes);
        const stats = calculateStats(gamesPlain, playerId);
        Object.assign(response, stats);
      }
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateStats(
  games: Array<Pick<GameAttributes, 'outcome' | 'winnerPlayerId'>>,
  playerId: string
): PlayerStats {
  const stats = { wins: 0, draws: 0, losses: 0 };
  for (const { outcome, winnerPlayerId } of games) {
    if (outcome === 'WIN') {
      if (winnerPlayerId === playerId) stats.wins++;
      else stats.losses++;
    } else if (outcome === 'DRAW') {
      stats.draws++;
    }
  }
  return stats;
}

