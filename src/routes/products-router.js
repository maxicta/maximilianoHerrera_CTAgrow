const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', function(req, res, next) {
	const productos = JSON.parse(fs.readFileSync('../data/products.json','utf-8'));
        
    res.render('home', {productos: productos.productos});
	});


module.exports = router;
