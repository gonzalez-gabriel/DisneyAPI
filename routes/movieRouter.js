const { Router } = require('express');
const movieController = require('../controllers/movieController');
const validator = require('express-joi-validation').createValidator();
// const queryValidator = require('../validations/queryValidator');
const {
  bodyValidator,
  queryValidator,
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
    .put(putMovieById)
    .delete(deleteMovieById)
    .get(movieDetailsById);

  return movieRouter;
};

module.exports = routes;
