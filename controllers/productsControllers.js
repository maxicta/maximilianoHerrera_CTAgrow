const { log } = require('console');
const fs = require('fs')

const productsController = {
    home: (req,res,next) => {
        const data = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));
        const productos = data.productos
        res.render('home',{ productos })
    }
}
module.exports = productsController;





