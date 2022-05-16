const { Router } = require('express');
const userController = require('../controllers/userController');

const routes = (User) => {
  const userRouter = Router();
  const { postUser, login, getUsers } = userController(User);

  userRouter.route('/auth/register').post(postUser);
  userRouter.route('/auth/login').post(login);
  userRouter.route('/auth').get(getUsers);
  return userRouter;
};

module.exports = routes;
