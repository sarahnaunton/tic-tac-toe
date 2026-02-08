'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game.belongsTo(models.player, {
        foreignKey: 'winnerPlayerId',
        as: 'winner'
      });
      game.hasMany(models.move, {
        foreignKey: 'gameId',
        as: 'moves'
      });
      game.hasMany(models.gamePlayer, {
        foreignKey: 'gameId',
        as: 'gamePlayers'
      });
    }
  }
  game.init({
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
      references: {
        model: 'players',
        key: 'id',
      },
    },
    boardSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};