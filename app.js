var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboard = require('./routes/user_dash_board');
var accountSummary = require('./routes/trasaction');

var app = express();
var mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', dashboard);
app.use('/get_account_summary', accountSummary);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/personell_details_db', { "useNewUrlParser": true }, function (err, result) {
    if(err) throw err;
    console.log("Connection Successful!");
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
