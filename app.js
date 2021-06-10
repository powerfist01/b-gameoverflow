const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const passport = require('passport')
const helmet = require("helmet");

require('./middlewares/passport')(passport);

require('./services/db');

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));    // configuring morgan


const indexRouter = require('./routes/index');
const questionRouter = require('./routes/questions')(express);
const gameRouter = require('./routes/games')(express);
const tagRouter = require('./routes/tags')(express);
const usersRouter = require('./routes/users')(express);

app.use('/', indexRouter);
app.use('/questions', questionRouter);
app.use('/games', gameRouter);
app.use('/tags', tagRouter);
app.use('/users', usersRouter);

module.exports = app;