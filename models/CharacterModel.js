const { Sequelize } = require('sequelize');

const model = (sequelize) => {
  const character = sequelize.define(
    'character',
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      history: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return character;
};

module.exports = model;
