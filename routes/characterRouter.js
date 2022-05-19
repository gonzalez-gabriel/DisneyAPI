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
    .get(getCharacters);

  characterRouter
    .route('/characters/:id')
    .put(putCharacterById)
    .delete(deleteCharacterById)
    .get(validator.params(idValidator), characterDetailsById);

  return characterRouter;
};

module.exports = routes;
