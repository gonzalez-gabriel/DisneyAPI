const { Router } = require('express');
const characterController = require('../controllers/characterController');

const routes = (Character) => {
  const characterRouter = Router();

  const {
    getCharacters,
    postCharacter,
    putCharacterById,
    deleteCharacterById,
  } = characterController(Character);
  characterRouter.route('/characters').post(postCharacter).get(getCharacters);

  characterRouter
    .route('/characters/:id')
    .put(putCharacterById)
    .delete(deleteCharacterById);

  return characterRouter;
};

module.exports = routes;
