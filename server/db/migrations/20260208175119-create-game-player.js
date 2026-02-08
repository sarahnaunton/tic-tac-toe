'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gamePlayers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      gameId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'games',
          key: 'id',
        },
      },
      playerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id',
        },
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
    await queryInterface.addIndex('gamePlayers', ['gameId', 'playerId'], {
      unique: true,
      name: 'game_players_game_id_player_id_unique',
    });
    await queryInterface.addIndex('gamePlayers', ['gameId', 'symbol'], {
      unique: true,
      name: 'game_players_game_id_symbol_unique',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('gamePlayers', 'game_players_game_id_symbol_unique');
    await queryInterface.removeIndex('gamePlayers', 'game_players_game_id_player_id_unique');
    await queryInterface.dropTable('gamePlayers');
  },
};
