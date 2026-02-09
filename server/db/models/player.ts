import { Model, Sequelize, ModelStatic, Optional } from 'sequelize';

export interface PlayerAttributes {
  id: string;
  username: string;
}

export type PlayerCreationAttributes = Optional<PlayerAttributes, 'id'>;

export type PlayerModel = ModelStatic<Model<PlayerAttributes, PlayerCreationAttributes>>;

export default function (sequelize: Sequelize, DataTypes: any): PlayerModel {
  class Player extends Model<PlayerAttributes, PlayerCreationAttributes> implements PlayerAttributes {
    declare id: string;
    declare username: string;

    static associate(models: Record<string, ModelStatic<Model>>): void {
      Player.hasMany(models.game, { foreignKey: 'winnerPlayerId', as: 'winnerGames' });
      Player.hasMany(models.move, { foreignKey: 'playerId', as: 'moves' });
      Player.hasMany(models.gamePlayer, { foreignKey: 'playerId', as: 'gamePlayers' });
    }
  }

  Player.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: 'player' }
  );

  return Player;
}

