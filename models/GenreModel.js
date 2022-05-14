const { Sequelize } = require('sequelize');

const model = (sequelize) => {
  const genre = sequelize.define(
    'genre',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
  return genre;
};

module.exports = model;
