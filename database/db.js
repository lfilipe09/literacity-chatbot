require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'postgres',
  protocol: 'postgres',
  native: true,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
});

module.exports = sequelize;