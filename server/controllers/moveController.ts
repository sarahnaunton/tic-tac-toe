import { Request, Response } from 'express';
import { models } from '../db';
import { MoveAttributes } from '../db/models/move';

type CreateMoveBody = Omit<MoveAttributes, 'id'>;

export async function createMove(
  req: Request<{}, {}, CreateMoveBody>,
  res: Response
): Promise<Response> {
  try {
    const { gameId, playerId, positionRow, positionColumn, moveNumber } = req.body;

    if (!gameId || !playerId || !moveNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!Number.isInteger(positionRow) || !Number.isInteger(positionColumn) || !Number.isInteger(moveNumber)) {
      return res.status(400).json({ error: 'positionRow, positionColumn and moveNumber must be integers' });
    }

    const gamePlayer = await models.gamePlayer.findOne({ where: { gameId, playerId } });
    if (!gamePlayer) {
      return res.status(403).json({ error: 'Player is not in this game' });
    }

    const game = await models.game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const boardSize = game.get('boardSize') as number;
    if (positionRow < 0 || positionRow >= boardSize || positionColumn < 0 || positionColumn >= boardSize) {
      return res.status(400).json({ error: 'Position is out of bounds' });
    }
    

    const move = await models.move.create({
      gameId,
      playerId,
      positionRow,
      positionColumn,
      moveNumber
    });

    return res.status(201).json(move.get({ plain: true }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
