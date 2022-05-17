const Character = require('../models/CharacterModel');
const Genre = require('../models/GenreModel');

const movieController = (Movie) => {
  //GET MOVIES
  const getMovies = async (req, res) => {
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];
    try {
      const response = await Movie.findAll({
        attributes: ['movieId', 'image_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
      });
      switch (key) {
        case 'title': {
          const response = await Movie.findAll({
            where: { [key]: value },
            attributes: ['movieId', 'image_url', 'title', 'created_at'],
          });
          const data = response.map((movie) => movie.dataValues);
          res.status(200).json(data);
          break;
        }
        case 'genre': {
          const response = await Movie.findAll({
            attributes: ['movieId', 'image_url', 'title', 'created_at'],
            includes: [
              {
                model: Genre,
                as: 'genres',
                where: { genreId: value },
                through: {
                  attributes: [],
                },
              },
            ],
          });
          const data = response.map((movie) => movie.dataValues);
          res.status(200).json(data);
          break;
        }
        case 'order': {
          const response = await Movie.findAll({
            attributes: ['movieId', 'image_url', 'title', 'created_at'],
            order: [['created_at', value]],
          });
          const data = response.map((movie) => movie.dataValues);
          res.status(200).json(data);
          break;
        }
        default: {
        }
      }

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

      const charactersDB = await Character.findAll();
      const genresDB = await Genre.findAll();

      charactersDB.forEach(async (character) => {
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
    const { image_url, title, created_at, rate, characters, genres } = body;
    try {
      // const response = await Movie.update(body, {
      //   where: { movieId: params.id },
      // });
      const movieToUpdate = await Movie.findOne({
        where: { movieId: params.id },
      });
      if (movieToUpdate) {
        movieToUpdate.image_url = image_url;
        movieToUpdate.title = title;
        movieToUpdate.created_at = created_at;
        movieToUpdate.rate = rate;
      }

      movieToUpdate.setCharacters([]);
      movieToUpdate.setGenres([]);

      const charactersDB = await Character.findAll();
      const genresDB = await Genre.findAll();
      charactersDB.forEach(async (character) => {
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
          {
            model: Genre,
            as: 'genres',
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
