const { Router } = require('express');
const movieController = require('../controllers/movieController');
const validator = require('express-joi-validation').createValidator();
const {
  bodyValidator,
  queryValidator,
  idValidator,
} = require('../validations/movieValidations');

const routes = (Movie) => {
  const movieRouter = Router();

  const {
    getMovies,
    postMovie,
    putMovieById,
    deleteMovieById,
    movieDetailsById,
  } = movieController(Movie);
  movieRouter
    .route('/movies')
    .post(validator.body(bodyValidator), postMovie)
    .get(validator.query(queryValidator), getMovies);

  movieRouter
    .route('/movies/:id')
    .put(validator.params(idValidator), putMovieById)
    .delete(validator.params(idValidator), deleteMovieById)
    .get(validator.params(idValidator), movieDetailsById);

  return movieRouter;
};

module.exports = routes;
