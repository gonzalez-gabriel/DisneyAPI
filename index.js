// ENVIRONMENT VARIABLES
require('dotenv').config();
// SERVER DEPENDENCIES
const express = require('express');
const path = require('path');
// DB DEPENDENCIES
const sequelize = require('./database.js');
// ROUTERS
const {
  characterRouter,
  genreRouter,
  movieRouter,
  userRouter,
} = require('./routes');
// const Character = require('./models/CharacterModel');
// const Genre = require('./models/GenreModel');
// const Movie = require('./models/MovieModel');
// const characterRouter = require('./routes/characterRouter');
// const genreRouter = require('./routes/genreRouter');
// const movieRouter = require('./routes/movieRouter');
// MIDDLEWARE REQUIRE
// const expressJwt = require('express-jwt');
const { expressjwt: jwt } = require('express-jwt');
// CONFIGURATIONS
const SERVER_PORT = process.env.SERVER_PORT;
// DB CONNECTION
require('./database.js');

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all(
  '/*',
  jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: ['/auth/login', '/auth/register'],
  })
);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json('Invalid credentials');
  } else {
    next(err);
  }
});
// ROUTES
app.use('/', characterRouter, genreRouter, movieRouter, userRouter);

// PORT EXPOSED
app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
(async () => {
  try {
    await sequelize.sync({ force: true });
    // await sequelize.sync();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
