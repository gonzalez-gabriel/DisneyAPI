const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// const model = (sequelize) => {
const Movie = sequelize.define(
  'movie',
  {
    movieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
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
