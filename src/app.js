const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products-router')
const shopcarRouter = require('./routes/shopCarRouter')
const apiShopcarRouter = require('./routes/api/cart')
const apiProductsRouter = require('./routes/api/products')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'tu-llave-secreta',
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
  }
}));
// app.use((req, res, next) => {
//   console.log("SESSION ACTUAL:", req.session);
//   next();
// });

/* app.use((req, res, next) => {
  console.log('Estado de la sesión:', {
      tieneSession: !!req.session,
      sessionID: req.sessionID,
      datosSession: req.session
  });
  next();
});
 */

app.use('/', indexRouter);
app.use('/product', productsRouter);
app.use('/users', usersRouter);
app.use('/shopcar', shopcarRouter);
app.use('/api/shopcar', apiShopcarRouter);
app.use('/api/products', apiProductsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in develop ent
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
