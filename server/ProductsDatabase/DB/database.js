const Sequelize = require('sequelize');
// const database = new Sequelize('postgres://localhost:5432/all_products', {logging: false});

const database = new Sequelize('all_products', 'jasonbhatti', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = database;