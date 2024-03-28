var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Database
const connectDB=require('./config/dbconfig')

var jwt = require('jsonwebtoken');

var authRouter = require('./routes/authRouter');
var usersRouter = require('./routes/admin');
var adminRouter = require('./routes/admin');

require('dotenv').config()

var cors = require('cors')
var app = express();
connectDB()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(cors({
  origin:['https://kick-off.onrender.com','http://localhost:3000'],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
