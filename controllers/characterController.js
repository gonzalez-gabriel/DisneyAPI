const Movie = require('../models/MovieModel');
const { Op } = require('sequelize');

const characterController = (Character) => {
  //GET CHARACTERS
  const getCharacters = async (req, res) => {
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];
    try {
      switch (key) {
        case 'name':
        case 'age':
        case 'weight': {
          const response = await Character.findAll({
            where: { [key]: value },
            attributes: ['characterId', 'name', 'image_url'],
          });
          const data = response.map((character) => character.dataValues);
          res.status(200).json(data);
          break;
        }
        case 'movies': {
          const response = await Character.findAll({
            attributes: ['characterId', 'name', 'image_url'],
            include: [
              {
                model: Movie,
                as: 'movies',
                where: { movieId: value ?? null },
                attributes: [],
                through: {
                  attributes: [],
                },
              },
            ],
          });
          const data = response.map((character) => character.dataValues);
          res.status(200).json(data);
          break;
        }
        default: {
          const response = await Character.findAll({
            attributes: ['characterId', 'name', 'age'],
          });
          const data = response.map((character) => character.dataValues);
          res.status(200).json(data);
          break;
        }
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  //POST CHARACTER
  const postCharacter = async (req, res) => {
    const { body } = req;
    const { movies } = body;
    try {
      const response = await Character.create(body);

      const moviesDB = await Movie.findAll();

      moviesDB.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title)) {
          await response.addMovie(movie);
        }
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json('Error');
    }
  };
  //PUT CHARACTER
  const putCharacterById = async (req, res) => {
    const { params, body } = req;
    const { image_url, name, age, weight, history, movies } = body;
    try {
      const characterToUpdate = await Character.findOne({
        where: { characterId: params.id },
      });
      if (characterToUpdate) {
        characterToUpdate.image_url = image_url;
        characterToUpdate.name = name;
        characterToUpdate.age = age;
        characterToUpdate.weight = weight;
        characterToUpdate.history = history;
      }

      await characterToUpdate.setMovies([]);

      const moviesDB = await Movie.findAll();

      moviesDB.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title)) {
          await characterToUpdate.addMovie(movie);
        }
      });
      characterToUpdate.save();
      // const response = await Character.update(body, {
      //   where: { characterId: params.id },
      // });
      res.status(200).json('Character updated');
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  //DELETE CHARACTER
  const deleteCharacterById = async (req, res) => {
    const { params } = req;
    try {
      const response = await Character.destroy({
        where: { characterId: params.id },
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json('Error');
    }
  };

  const characterDetailsById = async (req, res) => {
    const { params } = req;
    try {
      const response = await Character.findAll({
        where: { characterId: params.id },
        include: [
          {
            model: Movie,
            as: 'movies',
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  return {
    getCharacters,
    postCharacter,
    putCharacterById,
    deleteCharacterById,
    characterDetailsById,
  };
};

module.exports = characterController;
