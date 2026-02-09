import { Sequelize, DataTypes } from 'sequelize';
import playerModel, { type PlayerModel } from './models/player';
import gameModel, { type GameModel } from './models/game';
import moveModel, { type MoveModel } from './models/move';
import gamePlayerModel, { type GamePlayerModel } from './models/gamePlayer';

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    dialect: 'postgres',
  }
);

export interface Models {
  player: PlayerModel;
  game: GameModel;
  move: MoveModel;
  gamePlayer: GamePlayerModel;
}

const models: Models = {
  player: playerModel(sequelize, DataTypes),
  game: gameModel(sequelize, DataTypes),
  move: moveModel(sequelize, DataTypes),
  gamePlayer: gamePlayerModel(sequelize, DataTypes),
};

Object.values(models).forEach((model) => {
  (model as { associate?: (m: Models) => void }).associate?.(models);
});

export { sequelize, models };

