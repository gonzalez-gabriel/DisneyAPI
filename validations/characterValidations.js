const Joi = require('joi');

const bodyValidator = Joi.object({
  image_url: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  weight: Joi.number().required(),
  history: Joi.string().required(),
  movies: Joi.array().items(Joi.string().required()).required(),
});

const queryValidator = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().required(),
  }),

  Joi.object({
    age: Joi.string().required(),
  }),
  Joi.object({
    weight: Joi.string().required(),
  }),
  Joi.object({
    movies: Joi.string().required(),
  }),
  Joi.object({})
);

const idValidator = Joi.object({
  id: Joi.number().required(),
});
module.exports = { bodyValidator, queryValidator, idValidator };
