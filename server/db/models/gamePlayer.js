'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gamePlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      gamePlayer.belongsTo(models.game, { 
        foreignKey: 'gameId',
         as: 'game'
       });
      gamePlayer.belongsTo(models.player, { 
        foreignKey: 'playerId', 
        as: 'player' 
      });
    }
  }
  gamePlayer.init({
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
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'gamePlayer',
    indexes: [
      { unique: true, fields: ['gameId', 'playerId'] },
      { unique: true, fields: ['gameId', 'symbol'] },
    ],
  });
  return gamePlayer;
};