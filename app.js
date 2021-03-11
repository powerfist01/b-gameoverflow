const express = require('express');
const logger = require('morgan');

require('dotenv').config();

require('./sevices/db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));

const indexRouter = require('./routes/index');
const questionRouter = require('./routes/questions')(express);


app.use('/', indexRouter);
app.use('/questions', questionRouter);

module.exports = app;