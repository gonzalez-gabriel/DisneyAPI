const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// const model = (sequelize) => {
const Movie = sequelize.define(
  'movie',
  {
    movieId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// return movie;
// };

module.exports = Movie;
