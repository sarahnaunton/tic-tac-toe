import { Model, Sequelize, ModelStatic, Optional } from 'sequelize';

export interface MoveAttributes {
  id: string;
  gameId: string;
  playerId: string;
  moveNumber: number;
  positionRow: number;
  positionColumn: number;
}

export type MoveCreationAttributes = Optional<MoveAttributes, 'id'>;

export type MoveModel = ModelStatic<Model<MoveAttributes, MoveCreationAttributes>>;

export default function (sequelize: Sequelize, DataTypes: any): MoveModel {
  class Move extends Model<MoveAttributes, MoveCreationAttributes> implements MoveAttributes {
    declare id: string;
    declare gameId: string;
    declare playerId: string;
    declare moveNumber: number;
    declare positionRow: number;
    declare positionColumn: number;

    static associate(models: Record<string, ModelStatic<Model>>): void {
      Move.belongsTo(models.player, { foreignKey: 'playerId', as: 'player' });
      Move.belongsTo(models.game, { foreignKey: 'gameId', as: 'game' });
    }
  }

  Move.init(
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
      moveNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      positionRow: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      positionColumn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'move' }
  );

  return Move;
}

