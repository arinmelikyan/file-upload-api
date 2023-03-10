const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();
require('./middlewares/passport');
require('./models/user');

const middlewares = require('./middlewares/errorHandler');
const api = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌎🌍🌏✨🦄',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;