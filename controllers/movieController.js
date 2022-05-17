const Character = require('../models/CharacterModel');
const Genre = require('../models/GenreModel');

const movieController = (Movie) => {
  //GET MOVIES
  const getMovies = async (req, res) => {
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];
    try {
      const response = await Movie.findAll({
        attributes: ['image_url', 'title', 'created_at'],
      });
      // switch (key) {
      //   case 'title':
      //   case 'genre':
      // }
      // const response = await Movie.findAll({
      //   include: [
      //     {
      //       model: Character,
      //       as: 'characters',
      //       attributes: ['name'],
      //       through: {
      //         attributes: [],
      //       },
      //     },
      //     {
      //       model: Genre,
      //       as: 'genres',
      //       attributes: ['name'],
      //       through: {
      //         attributes: [],
      //       },
      //     },
      //   ],
      // });
      const data = response.map((movie) => movie.dataValues);
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  //POST MOVIES
  const postMovie = async (req, res) => {
    const { body } = req;
    const { characters, genres } = body;
    try {
      const response = await Movie.create(body);

      const listOfCharacters = await Character.findAll();
      const genresDB = await Genre.findAll();

      listOfCharacters.forEach(async (character) => {
        if (characters.includes(character.dataValues.name)) {
          await response.addCharacter(character);
        }
      });
      genresDB.forEach(async (genre) => {
        if (genres.includes(genre.dataValues.name)) {
          await response.addGenre(genre);
        }
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  //PUT MOVIE
  const putMovieById = async (req, res) => {
    const { params, body } = req;
    try {
      const response = await Movie.update(body, {
        where: { movieId: params.id },
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  //DELETE MOVIE
  const deleteMovieById = async (req, res) => {
    const { params } = req;
    try {
      const response = await Movie.destroy({ where: { movieId: params.id } });
      res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  //MOVIE DETAILS WITH CHARACTERS
  const movieDetailsById = async (req, res) => {
    const { params } = req;
    try {
      const response = await Movie.findOne({
        where: { movieId: params.id },
        include: [
          {
            model: Character,
            as: 'characters',
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
    getMovies,
    postMovie,
    putMovieById,
    deleteMovieById,
    movieDetailsById,
  };
};

module.exports = movieController;
