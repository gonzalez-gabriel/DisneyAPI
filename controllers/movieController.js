const movieController = (Movie) => {
  //GET MOVIES
  const getMovies = async (req, res) => {
    try {
      const response = await Movie.findAll();
      const data = response.map((movie) => movie.dataValues);
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  //POST MOVIES
  const postMovie = async (req, res) => {
    const { body } = req;
    try {
      const response = await Movie.create(body);
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
        where: { id: params.id },
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
      const response = await Movie.destroy({ where: { id: params.id } });
      res.status(200).json(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    getMovies,
    postMovie,
    putMovieById,
    deleteMovieById,
  };
};

module.exports = movieController;
