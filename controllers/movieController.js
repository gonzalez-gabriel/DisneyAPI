const Character = require('../models/CharacterModel');
const Genre = require('../models/GenreModel');

const movieController = (Movie) => {
  //GET MOVIES
  const getMovies = async (req, res) => {
    const key = Object.keys(req.query)[0];
    const value = Object.values(req.query)[0];
    try {
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
            include: [
              {
                model: Genre,
                as: 'genres',
                where: { genreId: value ?? null },
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
          const response = await Movie.findAll({
            attributes: ['movieId', 'image_url', 'title', 'created_at'],
          });
          const data = response.map((movie) => movie.dataValues);
          res.status(200).json(data);
        }
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  //POST MOVIES
  const postMovie = async (req, res) => {
    const { body } = req;
    const { characters, genres } = body;
    try {
      const newMovie = await Movie.create(body);

      const charactersDB = await Character.findAll();
      const genresDB = await Genre.findAll();

      charactersDB.forEach(async (character) => {
        if (characters.includes(character.dataValues.name)) {
          await newMovie.addCharacter(character);
        }
      });
      genresDB.forEach(async (genre) => {
        if (genres.includes(genre.dataValues.name)) {
          await newMovie.addGenre(genre);
        }
      });
      res.status(201).json(newMovie);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json('The title must be unique');
      } else {
        res.status(500).json(err.message);
      }
    }
  };
  //PUT MOVIE
  const putMovieById = async (req, res) => {
    const { params, body } = req;
    const { image_url, title, created_at, rate, characters, genres } = body;
    try {
      const movieToUpdate = await Movie.findOne({
        where: { movieId: params.id },
      });
      if (movieToUpdate) {
        movieToUpdate.image_url = image_url;
        movieToUpdate.title = title;
        movieToUpdate.created_at = created_at;
        movieToUpdate.rate = rate;
      }

      await movieToUpdate.setCharacters([]);

      const charactersDB = await Character.findAll();

      charactersDB.forEach(async (character) => {
        if (characters.includes(character.dataValues.name)) {
          await movieToUpdate.addCharacter(character);
        }
      });
      await movieToUpdate.setGenres([]);

      const genresDB = await Genre.findAll();
      genresDB.forEach(async (genre) => {
        if (genres.includes(genre.dataValues.name)) {
          await movieToUpdate.addGenre(genre);
        }
      });
      if (await Movie.findOne({ where: { title } })) {
        throw new Error('The title already exist');
      }
      movieToUpdate.save();

      res.status(201).json('Movie updated');
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  //DELETE MOVIE
  const deleteMovieById = async (req, res) => {
    const { params } = req;
    try {
      const response = await Movie.destroy({ where: { movieId: params.id } });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  //MOVIE DETAILS WITH CHARACTERS
  const movieDetailsById = async (req, res) => {
    const { params } = req;
    try {
      const movieDetails = await Movie.findOne({
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
      res.status(200).json(movieDetails);
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
