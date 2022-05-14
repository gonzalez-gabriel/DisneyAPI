require('dotenv').config();
const { Sequelize } = require('sequelize');
const { USER, HOST, DB, PASSWORD, PORT } = process.env;
const fs = require('fs');
const path = require('path');

//DB connection
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  logging: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const { CharacterModel, MovieModel, GenreModel } = sequelize.models;

CharacterModel.hasMany(MovieModel);
GenreModel.hasMany(MovieModel);
MovieModel.belongToMany(CharacterModel);
MovieModel.belongToMany(GenreModel);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
