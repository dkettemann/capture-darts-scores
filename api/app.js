var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
};
var shared = require('./shared/shared');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('./middleware/headers'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'))
  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/documents', require('./routes/documents'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var ld = {
    method: "urlMismatchHandler",
    user: "404",
    error: shared.error,
  }
  //next();
  ld.error("invalid request " + req.socket.parser.incoming.url)
  res.send({error: "invalid url"})
  //next(createError(404));
});

process.on('uncaughtException', function(err) {
  var ld = {
    method: "process.on(\'uncaughtException\')",
    user: "uncaughtException",
    error: shared.error,
  }
  ld.error(err)
  console.error(err)
});


process.on('unhandledRejection', (reason, promise) => {
  var ld = {
    method: "process.on(\'unhandledRejection\')",
    user: "unhandledRejection",
    error: shared.error
  }
  ld.error(reason.stack || reason)
})

// error handler
app.use(function (err, req, res, next) {
  var ld = {
    method: "ErrorHandler",
    user: "uncaughtError",
    error: shared.error,
  }
  ld.error(err.message)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error page (see views/error.jade)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
