const Joi = require('joi');

const bodyValidator = Joi.object({
  image_url: Joi.string().required(),
  title: Joi.string().required(),
  rate: Joi.number().integer().min(1).max(5).required(),
  created_at: Joi.date().required(),
  characters: Joi.array().items(Joi.string().required()).required(),
  genres: Joi.array().items(Joi.string().required()).required(),
});

const order = /ASC|DESC/;
const queryValidator = Joi.alternatives().try(
  Joi.object({
    title: Joi.string().required(),
  }),

  Joi.object({
    genre: Joi.string().required(),
  }),
  Joi.object({
    order: Joi.string().regex(order).required(),
  }),
  Joi.object({})
);
const idValidator = Joi.object({
  id: Joi.number().required(),
});

module.exports = { bodyValidator, queryValidator, idValidator };
