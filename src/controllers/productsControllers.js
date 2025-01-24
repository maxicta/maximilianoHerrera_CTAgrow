const { log } = require('console');
const fs = require('fs')

const productsController = {
    detail: (req,res,next) => {
        const id = req.params.id;
        const productos = JSON.parse(fs.readFileSync('../data/products.json','utf-8'));
        const producto = productos.find(producto => producto.id == id);
        res.render('products',{ producto })
    },

    home: (req,res) => {
        const productos = JSON.parse(fs.readFileSync('../data/products.json','utf-8'));
        res.render('home',{ productos: productos.productos });
    },
}
module.exports = productsController;





