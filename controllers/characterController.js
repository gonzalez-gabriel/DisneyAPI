const characterController = (Character) => {
  //GET CHARACTERS
  const getCharacters = async (req, res) => {
    try {
      const response = await Character.findAll();
      const data = response.map((character) => character.dataValues);
      res.status(200).json(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  //POST CHARACTER
  const postCharacter = async (req, res) => {
    const { body } = req;
    try {
      const response = await Character.create(body);
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
        where: { id: params.id },
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
      const response = await Character.destroy({ where: { id: params.id } });
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
