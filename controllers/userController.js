const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = (User) => {
  const getUsers = async (req, res) => {
    try {
      const newUser = await User.findAll();
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err.message);
    }
  };

  //REGISTER
  const postUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      const newUser = await User.create({
        name,
        username,
        email,
        password: await bcrypt.hash(password, 2),
      });
      // console.log(newUser.password);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err.message);
    }
  };

  //LOGIN
  const login = async (req, res) => {
    try {
      const { body } = req;
      const user = await User.findOne({ where: { username: body.username } });
      if (
        user === null ||
        !(await bcrypt.compare(body.password, user.password))
      ) {
        return res.status(403).send('Unauthorized');
      }
      const token = generateToken(user);
      res.status(200).json(token);
    } catch (err) {
      console.log(err.message);
    }
  };

  //TOKEN
  const generateToken = (user) => {
    const tokenPayload = {
      username: user.username,
    };
    return jwt.sign(tokenPayload, process.env.TOKEN_SECRET);
  };

  return { postUser, login, getUsers };
};
module.exports = userController;
