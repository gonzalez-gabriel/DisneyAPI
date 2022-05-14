const { Sequelize } = require('sequelize');

const model = (sequelize) => {
  const movie = sequelize.define(
    'movie',
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
  return movie;
};

module.exports = model;
