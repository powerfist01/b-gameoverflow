const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(logger('dev'));
app.use(cookieParser());

var indexRouter = require('./api/routes/index');

app.use('/', indexRouter);

module.exports = app;