const db = require('../../data/products.json','utf-8');
const { log } = require('console');
const fs = require('fs')

const productsController = {
    home: (req,res) => {
        //const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        const productos = db;
        res.render('home',{ productos: productos.productos });
/*         console.log(productos);
 */        
    },

    detail: (req,res,next) => {
        const id = req.params.id;
        //const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        const producto = db.productos.find(producto => producto.id == id);
        //console.log(producto);
        
        return res.render('products/products',{ ...producto })
    },

    add: (req,res) => {
        res.render('admin/productAdd');
    },
    
    
    store: (req,res) => {
        const productos = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        const newProduct = req.body;
        productos.productos.push(newProduct);
        fs.writeFileSync('./data/products.json',JSON.stringify(productos,null,2),'utf-8');
        res.render('home',{ productos: productos.productos });
    },
    
    edit: (req,res) => {
        console.log('edit');
        
        res.render('/admin/productEdit');
    },

    update: (req,res) => {
        res.render('products');
    },

    remove: (req,res) => {
        res.send('products');
    }


}
module.exports = productsController;





