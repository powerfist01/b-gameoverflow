const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport')

require('./middlewares/passport')(passport);

require('dotenv').config();

require('./services/db');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));    // configire morgan

const indexRouter = require('./routes/index');
const questionRouter = require('./routes/questions')(express);
const gameRouter = require('./routes/games')(express);
const tagRouter = require('./routes/tags')(express);
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/questions', questionRouter);
app.use('/games', gameRouter);
app.use('/tags', tagRouter);
app.use('/users', usersRouter);

module.exports = app;