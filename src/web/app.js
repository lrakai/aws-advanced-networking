var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var apiUrl = process.env.API_URL ? process.env.API_URL : 'http://localhost:3001';
var db;
var index = require('./routes/index');
var ApiClient = require('./lib/api/client');
var apiClient = new ApiClient(apiUrl);

process.title = "aan-web";

var environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
environment = environment.trim();
console.log('NODE_ENV: ' + environment);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if (environment === 'development') {
  app.locals.pretty = true;
}


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.route('/api')
  .get(apiClient.request.bind(apiClient))
  .put(apiClient.request.bind(apiClient))
  .post(apiClient.request.bind(apiClient))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = environment === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
