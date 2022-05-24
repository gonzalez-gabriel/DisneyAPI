const Joi = require('joi');

const registerValidator = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(8).max(16).required(),
});

const loginValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { registerValidator, loginValidator };
