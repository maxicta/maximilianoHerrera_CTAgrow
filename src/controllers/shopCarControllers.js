const { Shopcar, Ordershop, Product } = require("../database/models");

shopCarController = {
    getCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
    
            // ahora podés buscar el carrito relacionado a ese userId
            const ordershop = await Ordershop.findOne({ where: { userId } });
    
            const cart = await Shopcar.findAll({
                where: { ordershopId: ordershop.id },
                include: ['products'] // o como tengas definida la relación
            });
    
            return res.render('products/shopCar', {
                title: 'Tu carrito',
                cart,
                isLoggedIn: true
            });
    
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            return res.status(500).send("Error interno al obtener el carrito");
        }
    },
    
    addToCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { productId, quantity } = req.body;

            let order = await Ordershop.findOne({
                where: { users_id: userId },
            });
            if (!order) {
                order = await Ordershop.create({ users_id: userId, total: 0 });
            }

            let item = await Shopcar.findOne({
                where: {
                    OrdersShops_id: order.id,
                    products_id: productId,
                },
            });

            if (item) {
                item.cant += Number(quantity);
                await item.save();
            } else {
                await Shopcar.create({
                    OrdersShops_id: order.id,
                    products_id: productId,
                    cant: quantity,
                });
            }

            return res.json({ message: "Producto agregado al carrito" });
        } catch (error) {
            console.log("Error al agregar producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    updateQuantity: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { productId } = req.params;
            const { quantity } = req.body;

            const order = await Ordershop.findOne({
                where: { users_id: userId },
            });

            const item = await Shopcar.findOne({
                where: {
                    OrdersShops_id: order.id,
                    products_id: productId,
                },
            });

            if (!item)
                return res
                    .status(404)
                    .json({ error: "Producto no encontrado en el carrito" });

            item.cant = quantity;
            await item.save();

            return res.json({ message: "Cantidad actualizada" });
        } catch (error) {
            console.log("Error al actualizar cantidad:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { productId } = req.params;

            const order = await Ordershop.findOne({
                where: { users_id: userId },
            });

            await Shopcar.destroy({
                where: {
                    OrdersShops_id: order.id,
                    products_id: productId,
                },
            });

            return res.json({ message: "Producto eliminado del carrito" });
        } catch (error) {
            console.log("Error al eliminar producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    clearCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const order = await Ordershop.findOne({
                where: { users_id: userId },
            });

            await Shopcar.destroy({
                where: { OrdersShops_id: order.id },
            });

            return res.json({ message: "Carrito vaciado" });
        } catch (error) {
            console.log("Error al vaciar carrito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
};

module.exports = shopCarController;
