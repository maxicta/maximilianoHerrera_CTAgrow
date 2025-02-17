const { readFile } = require("../data/fileSync");


const indexControllers = {
    
    admin: (req, res) => {
        const products = readFile('products.json')
        res.render('admin', {products, title: 'Administrador de productos'})
    }
}

module.exports = indexControllers;