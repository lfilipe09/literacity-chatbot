const Sequelize = require('sequelize');
const database = require('./db');

const User = database.define('user', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  context: {
    type: Sequelize.STRING,
    allowNull: false
  },
  allow_invite_whatsapp: {
    type: Sequelize.BOOLEAN
  },
  allow_personal_data: {
    type: Sequelize.BOOLEAN
  },
  know_can_not_participate: {
    type: Sequelize.BOOLEAN
  },
  know_about_remuneration: {
    type: Sequelize.BOOLEAN
  },
  know_about_free_surveys: {
    type: Sequelize.BOOLEAN
  },
  know_how_to_leave: {
    type: Sequelize.BOOLEAN
  },
  above_legal_age: {
    type: Sequelize.BOOLEAN
  },
  agree_to_terms_of_use: {
    type: Sequelize.BOOLEAN
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  family_income: {
    type: Sequelize.STRING,
    allowNull: false
  },
  how_many_residents: {
    type: Sequelize.STRING,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  race: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age_group: {
    type: Sequelize.STRING,
    allowNull: false
  },
  scholarity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  actual_occupation: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_zoom_user: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = User;