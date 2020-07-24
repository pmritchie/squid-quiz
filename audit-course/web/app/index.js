// pull in the express package
const express = require('express');
// add another logger
const error = require('debug')('web:error');
// middleware for sessions
const expressSession = require('express-session');
// store for saving sessions
const FileStore = require('session-file-store')(expressSession);
// load in the axios middleware
const API = require('./utils/API');
// load in the protectedRoute middleware
const protectedRoute = require('./utils/protectedRoute');
// create an express app
const publicRoutes = require('./routes/public');
const adminQuizRoutes = require('./routes/adminQuizzes');
const questionsRouter = require('./routes/adminQuestions');
const choicesRouter = require('./routes/adminChoices');

const app = express();
// session middleware
app.use(expressSession({
  // another secret used for encoding session data
  secret: process.env.SECRET,
  // should the session save again if nothing has changed?
  resave: false,
  // should sessions be created if they have no data?
  saveUninitialized: false,
  // where to store the session data
  store: new FileStore(),
}));
// function for passing default data to the templates
app.use((req, res, next) => {
  // pull the loggedIn state out of the session
  const { loggedIn = false } = req.session;
  // set it to locals (data passed to templates)
  res.locals.loggedIn = loggedIn;
  // go to the next middleware function
  next();
});
// setup a folder to hold all the static files
app.use(express.static('public'));
// checks to see if content type is url-encoded and parses it
app.use(express.urlencoded({ extended: true }));
// axios middleware
app.use(API);
// setting put as the view engine
app.set('view engine', 'pug');
// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);
app.use('/', publicRoutes);
app.use('/admin/quizzes', protectedRoute, adminQuizRoutes);
app.use('/admin/questions', protectedRoute, questionsRouter);
app.use('/admin/choices', protectedRoute, choicesRouter);
// four params are required to mark this as a error handling middleware
// the comment beloww this allows for eslint to not throw an error because
// I am not using the next funciton
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
