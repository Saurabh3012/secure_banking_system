var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bankRouter = require('./routes/banking');
var transactRouter = require('./routes/make_transaction');
var transList = require('./routes/get_trans_list');
var accountSummary2 = require('./routes/account_summary_2');
var userDetails = require('./routes/user_details');

var app = express();
var mongoose = require('mongoose');

var config = require("./config/config.json");


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// TODO: add your routes here
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/banking', bankRouter);
app.use('/make_transaction', transactRouter);
app.use('/get_trans_list', transList);
app.use('/account_summmary_2', accountSummary2);
app.use('/user_details', userDetails);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongodb.user + ':' + config.mongodb.pass + '@' + config.mongodb.host + ':' + config.mongodb.port + '/fcs', {"useNewUrlParser": true}, function (err, result) {
    if (err) throw err;
    console.log("Connection Successful!");
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("Soemthing went wrong")
    // res.render('error');
});

module.exports = app;
