const { Router } = require('express');
const genreController = require('../controllers/genreController');

const routes = (Genre) => {
  const genreRouter = Router();

  const { getGenres, postGenre, putGenreById, deleteGenreById } =
    genreController(Genre);
  genreRouter.route('/genres').post(postGenre).get(getGenres);

  genreRouter.route('/genres/:id').put(putGenreById).delete(deleteGenreById);

  return genreRouter;
};

module.exports = routes;
