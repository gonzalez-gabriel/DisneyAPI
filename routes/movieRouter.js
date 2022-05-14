const { Router } = require('express');
const movieController = require('../controllers/movieController');

const routes = (Movie) => {
  const movieRouter = Router();

  const { getMovies, postMovie, putMovieById, deleteMovieById } =
    movieController(Movie);
  movieRouter.route('/movies').post(postMovie).get(getMovies);

  movieRouter.route('/movies/:id').put(putMovieById).delete(deleteMovieById);

  return movieRouter;
};

module.exports = routes;
