const Sequelize = require('sequelize');

// 1. ime baze, 2. user, 3.password
const sequelize = new Sequelize('nodeComplete', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'});

module.exports = sequelize;
