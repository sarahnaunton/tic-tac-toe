'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('ABANDONED', 'IN_PROGRESS', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'IN_PROGRESS',
      },
      outcome: {
        type: Sequelize.ENUM('WIN', 'DRAW', 'UNKNOWN'),
        allowNull: false,
        defaultValue: 'UNKNOWN',
      },
      winnerPlayerId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'players',
          key: 'id',
        },
      },
      boardSize: {
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
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  }
};