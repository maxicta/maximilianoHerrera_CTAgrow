var express = require('express');
var router = express.Router();

const {admin, index} = require('../controllers/indexControllers')

const isLoggedIn = (req, res, next) => {
  console.log('req.session:', req.session); // Depuración
  if (!req.session.user || !req.session.user.id) { // Cambio aquí
    return res.status(401).json({ error: 'Debes estar logueado' });
  }
  next();
};

router
    .get('/', index)
    .get('/admin', isLoggedIn, admin);
module.exports = router;
