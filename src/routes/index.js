var express = require('express');
var router = express.Router();

let productsControllers = require('../controllers/productsControllers')

/* let productsController = require('../controllers/productsController');
const { home } = require('../controllers/productsControllers'); */
/* GET home page. */
/* router.get('/', function(req, res, next) {
    
    res.render('./home', { title: 'CTAgrowshop' });
});

module.exports = router; */


const fs = require('fs');

router.get('/', productsControllers.home /* function(req, res, next) {
    const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        
    res.render('home', {productos: productos.productos});
    } */);
router.get('/products', productsControllers.detail /* function(req, res, next) {
    const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        
    res.render('products', {productos: productos.productos});
    } */);


module.exports = router;
