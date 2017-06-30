  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  var bodyParser = require('body-parser');



  var index = require('./routes/index');
  var users = require('./routes/users');

  var app = express();
    config = require('./config/db'),
  mongoose = require('mongoose');

  mongoose.connect("mongodb://127.0.0.1:27017/testDB");
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;

  db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
  });
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  // app.use(session({secret: "Shh, its a secret!"}));
  app.use('/', index);
  app.use('/api/users', users);
  // app.use('/users', require('./controllers/users')) //using data

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
