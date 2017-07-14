  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  var bodyParser = require('body-parser');

// var connect = require('connect')
var firebase = require('firebase');
firebase.initializeApp({
    apiKey: "AIzaSyBM1ysxV1LMxhfhpvT67H26DlxlWZpyWfQ",
    authDomain: "ssss-164410.firebaseapp.com",
    databaseURL: "https://ssss-164410.firebaseio.com",
    projectId: "ssss-164410",
    storageBucket: "ssss-164410.appspot.com",
    messagingSenderId: "144923457663"
});
// var serveStatic = require('serve-static')
// var vhost = require('vhost')


  var index = require('./routes/index');
  var users = require('./routes/users');

  var app = express();

  config = require('./config/db'),
  mongoose = require('mongoose');

  // mongoose.connect("mongodb://127.0.0.1:27017/testDB");
  // mongoose.Promise = global.Promise;
  // var db = mongoose.connection;

  // db.on('error', function () {
  //   throw new Error('unable to connect to database at ' + config.db);
  // });
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser());
  // app.use(bodyParser({limit: '50mb'}));
  // app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


  app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, 'public')));
  // app.use("/public", express.static(path.join(__dirname, 'public')));
  app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use("/images", express.static(__dirname + '/public/images'));

  // app.use(session({secret: "Shh, its a secret!"}));
  app.use('/', index);
  // app.use('/api/users', users);
  app.use('/api', users);
  // app.use('/users', require('./controllers/users')) //using data

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
//   app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
