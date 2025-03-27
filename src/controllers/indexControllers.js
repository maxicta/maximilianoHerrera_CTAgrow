const {Product} = require('../database/models');


const indexControllers = {

    index : async (req,res) => {
        try {
            const products = await Product.findAll();
            return res.render('home',{
                products,
                title : "Home"
            })
        } catch (error) {
            throw new Error("error en el home", error);
        }
      
    },
    
    admin: async (req, res) => {
        try {
            const products = await Product.findAll({Product});
            res.render('admin', {products, title: 'Administrador de productos'})
            
        } catch (error) {
            throw new Error("error en el admin", error);
            
        }
    }
}

module.exports = indexControllers;