const { readFile } = require("../data/fileSync");


const indexControllers = {

    index : (req,res) => {
        return res.render('index')
    },
    
    admin: (req, res) => {
        const products = JSON.parse(readFile('products.json'))
        res.render('admin', {products, title: 'Administrador de productos'})
        console.log(products);
        
    }
}

module.exports = indexControllers;