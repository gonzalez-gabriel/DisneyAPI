const express = require('express');
const sequelize = require('./database.js');
const { characterRouter, genreRouter, movieRouter } = require('./routes');
// const Character = require('./models/CharacterModel');
// const Genre = require('./models/GenreModel');
// const Movie = require('./models/MovieModel');
// const characterRouter = require('./routes/characterRouter');
// const genreRouter = require('./routes/genreRouter');
// const movieRouter = require('./routes/movieRouter');
require('dotenv').config();
require('./database.js');

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', characterRouter, genreRouter, movieRouter);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
(async () => {
  try {
    // await sequelize.sync({ force: true });
    await sequelize.sync();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
