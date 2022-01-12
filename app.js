const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const helmet = require("helmet");

const config = require('./config/index');

require('./middlewares/passport')(passport, config);

require('./services/dbService');

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));    // configuring morgan

const indexRouter = require('./routes/index');
const questionRouter = require('./components/questions/questionsAPI')(express, passport);
const gameRouter = require('./components/games/gamesAPI')(express);
const tagRouter = require('./components/tags/tagsAPI')(express);
const usersRouter = require('./components/users/userAPI')(express, passport);
const newsRouter = require('./components/news/newsAPI')(express,  passport);

app.use('/', indexRouter);
app.use('/questions', questionRouter);
app.use('/games', gameRouter);
app.use('/tags', tagRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(404)
})

module.exports = app;