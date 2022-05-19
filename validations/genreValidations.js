const Joi = require('joi');

const bodyValidator = Joi.object({
  name: Joi.string().required(),
  image_url: Joi.string().required(),
  movies: Joi.array().items(Joi.string().required()).required(),
});

const idValidator = Joi.object({
  id: Joi.number().required(),
});

module.exports = { bodyValidator, idValidator };
