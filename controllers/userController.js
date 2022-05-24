const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const userController = (User) => {
  //GET USERS
  const getUsers = async (req, res) => {
    try {
      const usersDB = await User.findAll();
      res.status(200).json(usersDB);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  //REGISTER
  const postUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      post: 465,
      secure: true,
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.GMAIL_PASS,
      },
    });
    let mailOptions = {
      from: 'DisneyAPI',
      to: email,
      subject: 'WELCOME TO DISNEY-API',
      html: `
      <h1
        style="
          text-align: center;
          text-shadow: 1px 1px 2px black;
          font-size: 3rem;
          color: hsla(196, 100%, 40%, 1);
          margin: 0;
        "
      >
        WELCOME TO DISNEY API
      </h1>
      <div style=" overflow: hidden;
      margin:0 auto;
      width:16.5rem;
      height:12.5rem;">
        <img
          src="http://res.cloudinary.com/dw4hak4ok/image/upload/v1653188350/disney_dgbqqo.png"
          alt="disnep"
          style="width: 100%;object-fit: center;"
        />
      </div>
      <p style="text-align: center; font-size: 1.1rem">
        Now you can create, delete, update and get information about Disney
        movies, characters and genres and how they are related.
      </p>
      `,
    };
    try {
      const newUser = await User.create({
        name,
        username,
        email,
        password: await bcrypt.hash(password, 2),
      });
      await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.status(500).send(err.message);
        }
      });
      res.status(201).json(newUser);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json('Username and email must be unique');
      } else {
        res.status(500).json(err.message);
      }
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
        return res.status(401).send('Unauthorized');
      }
      const token = generateToken(user);
      res.status(200).json(token);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

  //TOKEN
  const generateToken = (user) => {
    const tokenPayload = {
      username: user.username,
    };
    return jwt.sign(tokenPayload, process.env.TOKEN_SECRET, {
      expiresIn: '3d',
    });
  };

  return { postUser, login, getUsers };
};
module.exports = userController;
