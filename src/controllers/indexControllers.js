const {Product} = require('../database/models');


const indexControllers = {

    index : async (req,res) => {
        try {
            const products = await Product.findAll();
            const ilumination = await Product.findAll({
                where : {
                    categorieId : 1
                }
            })

            const nutrient = await Product.findAll({
                where: {
                    categorieId : 3
                }
            })
            return res.render('index',{
                ilumination,
                nutrient,
                products,
                title : "Home"
            })
        } catch (error) {
            throw new Error("error en el home", error);
        }
    
    },
    
    admin: async (req, res) => {
        try {
            const userId = await req.session.user;
            const products = await Product.findAll({Product});
            res.render('admin', {products, userId, title: 'Administrador de productos'})
            
        } catch (error) {
            throw new Error("error en el admin", error);
            
        }
    }
}

module.exports = indexControllers;