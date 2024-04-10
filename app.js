var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var cors = require('cors');

// Database
const connectDB = require('./config/dbconfig');

var jwt = require('jsonwebtoken');

var authRouter = require('./routes/authRouter');
var usersRouter = require('./routes/admin');
var adminRouter = require('./routes/admin');

require('dotenv').config();

var app = express();
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// CORS configuration
const corsOptions = {
  origin: ['https://kick-off.onrender.com', 'http://localhost:3000'],
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Catch all other routes and serve the main HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
