const { Router } = require('express');
const genreController = require('../controllers/genreController');
const validator = require('express-joi-validation').createValidator();
const {
  bodyValidator,
  idValidator,
} = require('../validations/genreValidations');

const routes = (Genre) => {
  const genreRouter = Router();

  const { getGenres, postGenre, putGenreById, deleteGenreById } =
    genreController(Genre);
  genreRouter
    .route('/genres')
    .post(validator.body(bodyValidator), postGenre)
    .get(getGenres);

  genreRouter
    .route('/genres/:id')
    .put(
      validator.params(idValidator),
      validator.body(bodyValidator),
      putGenreById
    )
    .delete(validator.params(idValidator), deleteGenreById);

  return genreRouter;
};

module.exports = routes;
