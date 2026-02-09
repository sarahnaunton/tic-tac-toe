import { Model, Sequelize, ModelStatic, Optional } from 'sequelize';

export interface GameAttributes {
  id: string;
  status: 'ABANDONED' | 'IN_PROGRESS' | 'COMPLETED';
  outcome: 'WIN' | 'DRAW' | 'UNKNOWN';
  winnerPlayerId?: string | null;
  boardSize: number;
  completedAt?: Date | null;
}

export type GameCreationAttributes = Optional<
  GameAttributes,
  'id' | 'status' | 'outcome' | 'winnerPlayerId' | 'completedAt'
>;

export type GameModel = ModelStatic<Model<GameAttributes, GameCreationAttributes>>;

export default function (sequelize: Sequelize, DataTypes: any): GameModel {
  class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
    declare id: string;
    declare status: 'ABANDONED' | 'IN_PROGRESS' | 'COMPLETED';
    declare outcome: 'WIN' | 'DRAW' | 'UNKNOWN';
    declare winnerPlayerId: string | null | undefined;
    declare boardSize: number;
    declare completedAt: Date | null | undefined;

    static associate(models: Record<string, ModelStatic<Model>>): void {
      Game.belongsTo(models.player, { foreignKey: 'winnerPlayerId', as: 'winner' });
      Game.hasMany(models.move, { foreignKey: 'gameId', as: 'moves' });
      Game.hasMany(models.gamePlayer, { foreignKey: 'gameId', as: 'gamePlayers' });
    }
  }

  Game.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('ABANDONED', 'IN_PROGRESS', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'IN_PROGRESS',
      },
      outcome: {
        type: DataTypes.ENUM('WIN', 'DRAW', 'UNKNOWN'),
        allowNull: false,
        defaultValue: 'UNKNOWN',
      },
      winnerPlayerId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: 'players', key: 'id' },
      },
      boardSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    { sequelize, modelName: 'game' }
  );

  return Game;
}

