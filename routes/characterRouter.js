const { Router } = require('express');
const characterController = require('../controllers/characterController');
const validator = require('express-joi-validation').createValidator();
const {
  bodyValidator,
  queryValidator,
  idValidator,
} = require('../validations/characterValidations');

const routes = (Character) => {
  const characterRouter = Router();

  const {
    getCharacters,
    postCharacter,
    putCharacterById,
    deleteCharacterById,
    characterDetailsById,
  } = characterController(Character);
  characterRouter
    .route('/characters')
    .post(validator.body(bodyValidator), postCharacter)
    .get(validator.query(queryValidator), getCharacters);

  characterRouter
    .route('/characters/:id')
    .put(
      validator.params(idValidator),
      validator.body(bodyValidator),
      putCharacterById
    )
    .delete(validator.params(idValidator), deleteCharacterById)
    .get(validator.params(idValidator), characterDetailsById);

  return characterRouter;
};

module.exports = routes;
