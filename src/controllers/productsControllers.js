//const { log } = require('console');
const fs = require('fs');
const { readFile, writeFile } = require('../data/fileSync');
const { v4: uuidv4 } = require('uuid');
const { title } = require('process');

const productsController = {
    home: (req,res) => {
        const products = readFile('products.json');
        res.render('home',{ products: products , title: 'Lista de productos' });

    },

    detail: (req,res,next) => {
        const products = readFile('products.json');
        const id = req.params.id;
        const product = products.find(product => product.id == id);
        
        return res.render('products/products',{ ...product , title: 'Detalle del producto' });
        
        
    },

    add: (req,res) => {
        res.render('admin/productAdd', { title: 'Agregar producto' });
    },
    
    
    store: (req,res) => {
        const products = readFile('products.json');
        const {name, price, marca} = req.body;
        
        const newProduct = {

            id : uuidv4(),
            name: name,
            price: +price,
            marca: marca,
            image : "maceta.jpeg"
        };
        
        products.push(newProduct);
        
        writeFile('products.json',products);
        res.redirect('/admin');
    },
    
    edit: (req,res) => {
        const {id} = req.params;
        const products = readFile('products.json');
        const product = products.find(product => product.id == id);
        
        res.render('admin/productEdit',{...product, title: 'Editar producto'});
        
    },

    update: (req,res) => {

        
        const products = readFile('products.json');
        const {name,price,marca} = req.body;
        
        const productModify = products.map(product => {
            if(product.id === req.params.id){
                product.name = name;
                product.price = +price;
                product.marca = marca;
            }
            return product;
        })
        
        writeFile('products.json',productModify);
        res.redirect('/admin');
    },

    remove: (req,res) => {
        const products = readFile('products.json');
        const {id} = req.params;
        
        const productModify = products.filter(product => product.id !== id)

        writeFile('products.json',productModify);
        console.log(productModify);
        
        
        return res.redirect('/admin');
    }


}
module.exports = productsController;





