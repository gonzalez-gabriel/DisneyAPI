const Character = require('../models/CharacterModel');
const Genre = require('../models/GenreModel');
const Movie = require('../models/MovieModel');
const characterRouter = require('./characterRouter')(Character);
const genreRouter = require('./genreRouter')(Genre);
const movieRouter = require('./movieRouter')(Movie);

// const routes = () => {
//   // characterRouter(Character);
//   // movieRouter(Movie);
//   // genreRouter(Genre);
//   return { characterRouter, movieRouter, genreRouter };
// };
module.exports = { characterRouter, genreRouter, movieRouter };
