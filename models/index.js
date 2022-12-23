'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let connDB;
if (config.use_env_variable) {
  connDB = new Sequelize(process.env[config.use_env_variable], config);
} else {
  connDB = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

connDB
  .authenticate()
  .then(() => {
    console.log('connected..');
  })
  .catch((err) => {
    console.log('Error' + err);
  });

db.sequelize = connDB;
db.Sequelize = Sequelize;

db.User = require('./User.js')(connDB, DataTypes);
db.Employee = require('./Employee.js')(connDB, DataTypes);

module.exports = db;
