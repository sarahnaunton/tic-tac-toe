import { Model, Sequelize, ModelStatic, Optional } from 'sequelize';

export interface GamePlayerAttributes {
  id: string;
  gameId: string;
  playerId: string;
  symbol: string;
}

export type GamePlayerCreationAttributes = Optional<GamePlayerAttributes, 'id'>;

export type GamePlayerModel = ModelStatic<Model<GamePlayerAttributes, GamePlayerCreationAttributes>>;

export default function (sequelize: Sequelize, DataTypes: any): GamePlayerModel {
  class GamePlayer extends Model<GamePlayerAttributes, GamePlayerCreationAttributes> implements GamePlayerAttributes {
    declare id: string;
    declare gameId: string;
    declare playerId: string;
    declare symbol: string;

    static associate(models: Record<string, ModelStatic<Model>>): void {
      GamePlayer.belongsTo(models.game, { foreignKey: 'gameId', as: 'game' });
      GamePlayer.belongsTo(models.player, { foreignKey: 'playerId', as: 'player' });
    }
  }

  GamePlayer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      gameId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'games', key: 'id' },
      },
      playerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'players', key: 'id' },
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'gamePlayer',
      indexes: [
        { unique: true, fields: ['gameId', 'playerId'] },
        { unique: true, fields: ['gameId', 'symbol'] },
      ],
    }
  );

  return GamePlayer;
}

