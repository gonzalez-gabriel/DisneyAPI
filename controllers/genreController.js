const Movie = require('../models/MovieModel');
const { Op } = require('sequelize');

const genreController = (Genre) => {
  //GET GENRES
  const getGenres = async (req, res) => {
    try {
      const response = await Genre.findAll({
        include: [
          {
            model: Movie,
            as: 'movies',
            attributes: ['title'],
            through: {
              attributes: [],
            },
          },
        ],
      });
      const data = response.map((genre) => genre.dataValues);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  //POST GENRE
  const postGenre = async (req, res) => {
    const { body } = req;
    const { movies } = body;
    try {
      const newGenre = await Genre.create(body);

      const moviesDB = await Movie.findAll();

      moviesDB.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title)) {
          await newGenre.addMovie(movie);
        }
      });
      res.status(201).json('Genre created');
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json('The genre must be unique');
      } else {
        res.status(500).json(err.message);
      }
    }
  };
  //PUT GENRE
  const putGenreById = async (req, res) => {
    const { params, body } = req;
    const { movies, image_url, name } = body;

    try {
      const genreToUpdate = await Genre.findOne({
        where: { genreId: params.id },
      });

      if (genreToUpdate) {
        genreToUpdate.image_url = image_url;
        genreToUpdate.name = name;
      }

      await genreToUpdate.setMovies([]);

      const moviesDB = await Movie.findAll();

      moviesDB.forEach(async (movie) => {
        if (movies.includes(movie.dataValues.title))
          await genreToUpdate.addMovie(movie);
      });

      if (
        await Genre.findOne({
          where: {
            [Op.and]: [{ name }, { genreId: { [Op.ne]: params.id } }],
          },
        })
      ) {
        throw new Error('The genre already exist');
      }
      genreToUpdate.save();

      res.status(200).send('Genre updated');
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
  //DELETE GENRE
  const deleteGenreById = async (req, res) => {
    const { params } = req;
    try {
      const response = await Genre.destroy({ where: { genreId: params.id } });
      res.status(200).json(`${response} genre has been deleted`);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  return {
    getGenres,
    postGenre,
    putGenreById,
    deleteGenreById,
  };
};

module.exports = genreController;
