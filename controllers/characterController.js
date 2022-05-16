const Movie = require('../models/MovieModel');
const { Op } = require('sequelize');

const characterController = (Character) => {
  //GET CHARACTERS
  const getCharacters = async (req, res) => {
    const { age } = req.query;
    try {
      // const response = await Character.findAll({
      //   include: [
      //     {
      //       model: Movie,
      //       as: 'movies',
      //       attributes: ['title', 'rate'],
      //       through: {
      //         attributes: [],
      //       },
      //     },
      //   ],
      // });
      const response = await Character.findAll({
        attributes: ['name'],
        where: { age: age },
      });
      const data = response.map((character) => character.dataValues);
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  //POST CHARACTER
  const postCharacter = async (req, res) => {
    const { body } = req;
    const { movies } = body;
    console.log(body);
    try {
      const response = await Character.create(body);

      const listOfMovies = await Movie.findAll();

      listOfMovies.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title)) {
          await response.addMovie(movie);
        }
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  //PUT CHARACTER
  const putCharacterById = async (req, res) => {
    const { params, body } = req;
    try {
      const response = await Character.update(body, {
        where: { characterId: params.id },
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
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
      console.log(err.message);
    }
  };

  return {
    getCharacters,
    postCharacter,
    putCharacterById,
    deleteCharacterById,
  };
};

module.exports = characterController;
