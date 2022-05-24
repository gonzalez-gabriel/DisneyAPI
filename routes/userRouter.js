const { Router } = require('express');
const userController = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator();
const {
  registerValidator,
  loginValidator,
} = require('../validations/userValidations');

const routes = (User) => {
  const userRouter = Router();

  const { postUser, login } = userController(User);
  userRouter
    .route('/auth/register')
    .post(validator.body(registerValidator), postUser);
  userRouter.route('/auth/login').post(validator.body(loginValidator), login);

  return userRouter;
};

module.exports = routes;
