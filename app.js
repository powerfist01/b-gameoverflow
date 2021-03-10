const express = require('express');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger('dev'));
// app.use(cookieParser());

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

module.exports = app;