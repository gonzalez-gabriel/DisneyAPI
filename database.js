require('dotenv').config();
const { Sequelize } = require('sequelize');
const { USER, HOST, DB, PASSWORD, PORT } = process.env;

//DB connection
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
