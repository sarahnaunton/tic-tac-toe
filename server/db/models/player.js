'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
          player.hasMany(models.game, {
            foreignKey: 'winnerPlayerId',
            as: 'winnerGames'
          });
          player.hasMany(models.move, {
            foreignKey: 'playerId',
            as: 'moves'
          });
          player.hasMany(models.gamePlayer, {
            foreignKey: 'playerId',
            as: 'gamePlayers'
          });
    }
  }
  player.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};