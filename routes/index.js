var express = require('express');
var router = express.Router();

/* let {home} = require('./controllers/productsController')
 */
/* let productsController = require('../controllers/productsController');
const { home } = require('../controllers/productsControllers'); */
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'CTAgrowshop' });
});

module.exports = router;


