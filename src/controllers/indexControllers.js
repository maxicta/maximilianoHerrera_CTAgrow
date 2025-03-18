const {Product} = require('../database/models');


const indexControllers = {

    index : (req,res) => {
        return res.render('index')
    },
    
    admin: async (req, res) => {
        try {
            const products = await Product.findAll({Product});
            res.render('admin', {products, title: 'Administrador de productos'})
            console.log(products);
            
        } catch (error) {
            throw new Error("error en el admin", error);
            
        }
    }
}

module.exports = indexControllers;