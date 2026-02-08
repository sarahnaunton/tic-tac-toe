'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class move extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      move.belongsTo(models.player, {
        foreignKey: 'playerId',
        as: 'player'
      });
      move.belongsTo(models.game, {
        foreignKey: 'gameId',
        as: 'game'
      });
    }
  }
  move.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    gameId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'games',
        key: 'id',
      },
    },
    playerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'players',
        key: 'id',
      },
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
  }, {
    sequelize,
    modelName: 'move',
  });
  return move;
};