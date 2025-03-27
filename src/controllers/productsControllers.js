//const { log } = require('console');

const { v4: uuidv4 } = require("uuid");
const upload = require("../middlewares/uploadProduct");
const { Product, Categorie, Brand } = require("../database/models");

const productsController = {
    home: async (req, res) => {
        try {
            const products = await Product.findAll({ Product });
            //console.log(products);
            //return res.send(products)

            res.render("home", {
                products,
                title: "Lista de productos",
            });
        } catch (error) {
            throw new Error("error", error);
        }
    },

    detail: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { name, price, image, brand, description } =
                await Product.findByPk(id);

            return res.render("products/products", {
                name,
                price,
                image,
                brand,
                description,
                title: "Detalle del producto",
            });
        } catch (error) {
            throw new Error("error", error);
        }
    },

    add: (req, res) => {

        let categories = Categorie.findAll({
			order : ['name']
		});
        let brands = Brand.findAll({
			order : ['name']
		});        Promise.all([categories,brands])
        .then(([categories,brands]) => {
            return res.render('admin/productAdd',{
                brands,
                categories,
                title : "Agregar producto"
            })
        })
        .catch(error => console.log(error));
    },

    store: async (req, res) => {
        try {
            const { name, price, brand, categorie, description } = req.body;
            const imageProduct = req.file;

            await Product.create({
                name,
                price,
                brandId : brand,
                categorieId : categorie,
                description,
                image: imageProduct ? req.file.filename : "default-image.png",
            });
            res.redirect("/admin");
        } catch (error) {
            throw new Error("error en el store", error);
        }
    },

    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            const brands = await Brand.findAll({
                order : ['name']
            });
            const categories = await Categorie.findAll({
                order: ['name']
            })
            const {name, brandId, categorieId, description, price, image} = product;

            res.render("admin/productEdit", {
                id,
                name,
                brandId,
                description,
                categorieId,
                price,
                image,
                categories,
                brands,
                title: "Editar producto",
            });

        } catch (error) {
            throw new Error("error de edit", error);
        }
    },

    update: async (req, res) => {
        try {
            const { name, price, brand } = req.body;
            await Product.update({
                name,
                price,
                brand,
            });
        } catch (error) {}

        res.redirect("/admin");
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await Product.destroy({
                where: {
                    id:id
                }
            })
    
            return res.redirect("/admin");
            
        } catch (error) {
            
        }
    },
};
module.exports = productsController;
