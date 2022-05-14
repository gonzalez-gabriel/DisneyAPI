const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
require('dotenv').config();
require('./database.js');

const SERVER_PORT = process.env.SERVER_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
