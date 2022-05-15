const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// const model = (sequelize) => {
const Genre = sequelize.define(
  'genre',
  {
    genreId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// return genre;
// };

module.exports = Genre;
