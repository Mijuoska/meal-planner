const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./utils/config')
const middleware = require('./middleware')

const usersRouter = require('./routes/users')
const authRouter = require ('./routes/auth')
const recipesRouter = require('./routes/recipes')
const mealsRouter = require('./routes/meals')
const ingredientsRouter = require('./routes/ingredients')

const app = express();

const port = config.PORT 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Extract token from response
// app.use(middleware.tokenExtractor)
// app.use(middleware.verifyToken)

app.use('/api/recipes', recipesRouter)
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/meals', mealsRouter)
app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status ? err.status : 500
  res.locals.error = process.env.NODE_ENV === 'dev' ? err : {};
  res.status(res.locals.status).json({
    message: res.locals.message,
    error: res.locals.error
  })
});

app.listen(port, function () {
  console.log(`Server is running at port ${port}`)
})

module.exports = app;
