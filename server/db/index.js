const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

const models = {
  player: require('./models/player')(sequelize, Sequelize.DataTypes),
  game: require('./models/game')(sequelize, Sequelize.DataTypes),
  move: require('./models/move')(sequelize, Sequelize.DataTypes),
  gamePlayer: require('./models/gameplayer')(sequelize, Sequelize.DataTypes),
};

Object.values(models).forEach((model) => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, models };
