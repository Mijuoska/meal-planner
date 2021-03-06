const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport')
const logger = require('morgan');
const session = require('express-session')
const sessionStore = require('./db/sessionStore');
const config = require('./utils/config')
const usersRouter = require('./routes/users')
const authRouter = require ('./routes/auth')
const recipesRouter = require('./routes/recipes')
const mealsRouter = require('./routes/meals')
const ingredientsRouter = require('./routes/ingredients')
const unitsRouter = require('./routes/units')
const householdsRouter = require('./routes/households')

const app = express();

app.disable('x-powered-by')
app.disable('etag')

const port = config.PORT 


app.use(session({
  secret: config.SECRET,
  store: new sessionStore().sessionHandler(session),
  saveUninitialized: false,
  resave: false,
  unset: 'destroy',
  cookie: {
    sameSite: true,
    secure: config.NODE_ENV === 'production',
    maxAge: parseInt(config.SESSION_AGE)
  }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));


app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV == 'dev' ? 'http://localhost:3001' : process.env.HOSTDOMAIN
}))




app.set('trust proxy', true)

app.use('/api/auth', authRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/units', unitsRouter)
app.use('/api/meals', mealsRouter)
app.use('/api/users', usersRouter)
app.use('/api/households', householdsRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status ? err.status : 500
  res.locals.error = process.env.NODE_ENV === 'dev' ? err : {};
  
  res.status(res.locals.status).send({
    message: res.locals.message,
    error: res.locals.error
  })
});

app.listen(port, function () {
  console.log(`Server is running at port ${port}`)
})

module.exports = app;
