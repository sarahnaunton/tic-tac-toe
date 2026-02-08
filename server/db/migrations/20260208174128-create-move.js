'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('moves', {
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
      moveNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      positionRow: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      positionColumn: {
        type: Sequelize.INTEGER,
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('moves');
  }
};