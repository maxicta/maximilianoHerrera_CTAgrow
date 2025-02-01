const { log } = require('console');
const fs = require('fs')

const productsController = {
    home: (req,res) => {
        const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        
        res.render('home',{ productos: productos.productos });
        console.log(producto);
        
    },

    detail: (req,res,next) => {
        const id = req.params.id;
        const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        const producto = productos.find(producto => producto.producto == id);
        res.render('products',{ producto })
    },

    
}
module.exports = productsController;





