const Character = require('../models/CharacterModel');
const Genre = require('../models/GenreModel');
const Movie = require('../models/MovieModel');
const User = require('../models/UserModel');

const characterRouter = require('./characterRouter')(Character);
const genreRouter = require('./genreRouter')(Genre);
const movieRouter = require('./movieRouter')(Movie);
const userRouter = require('./userRouter')(User);

Character.belongsToMany(Movie, {
  through: 'CharacterMovie',
  as: 'movies',
  foreignKey: 'characterId',
});
Movie.belongsToMany(Character, {
  through: 'CharacterMovie',
  as: 'characters',
  foreignKey: 'movieId',
});
Genre.belongsToMany(Movie, {
  through: 'GenreMovie',
  as: 'movies',
  foreignKey: 'genreId',
});
Movie.belongsToMany(Genre, {
  through: 'GenreMovie',
  as: 'genres',
  foreignKey: 'movieId',
});
// const routes = () => {
//   // characterRouter(Character);
//   // movieRouter(Movie);
//   // genreRouter(Genre);
//   return { characterRouter, movieRouter, genreRouter };
// };
module.exports = { characterRouter, genreRouter, movieRouter, userRouter };
