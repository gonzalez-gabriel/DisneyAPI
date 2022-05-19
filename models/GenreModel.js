const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// const model = (sequelize) => {
const Genre = sequelize.define(
  'genre',
  {
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image_url: {
      type: DataTypes.STRING,
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
