const { Product, Ordershop, Shopcar } = require("../../database/models");

const apiProductsController = {
    list: async (req, res) => {
        try {
            const products = await Product.findAll();
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/products",
                },
                data: products,
            });
        } catch (error) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: "Error en el servidor",
                },
            });
        }
    },
    orders: async (req, res) => {
        try {

            const { userId } = req.query;

            const query = { include: { association: "Shopcars" } };

            if (userId && !isNaN(+userId)) {
                query.where = { userId };
            };

            const orders = await Ordershop.findAll(query);

            return res.status(200).json({
                meta: {
                    status: 200,
                    total: orders.length,
                    url: "/api/orders",
                },
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: "Error en el servidor",
                },
            });
        }
    },
    items: async (req, res) => {
        try {
            const { ordershopId } = req.query;

            const query = { include: { association: "product" } };

            if (ordershopId && !isNaN(+ordershopId)) {
                query.where = { ordershopId };
            }

            const items = await Shopcar.findAll(query);

            return res.status(200).json({
                meta: {
                    status: 200,
                    total: items.length,
                    url: "/api/items",
                },
                data: items,
            });
        } catch (error) {
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: "Error en el servidor",
                },
            });
        }
    }

};

module.exports = apiProductsController;
