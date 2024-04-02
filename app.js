const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const  connectDB  = require('./config/dbconfig');

// Load environment variables
require('dotenv').config();

// Routes
const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set up CORS
app.use(cors({
  origin: ['https://kick-off.onrender.com', 'http://localhost:3000']
}));

// Set up logging
app.use(logger('dev'));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Parse cookies
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
