const { Association } = require("sequelize");
const { Shopcar, Ordershop, Product } = require("../database/models");

shopCarController = {
    getCart: async (req, res) => {
        try {
            const userId = await req.session.user.id;

            const ordershop = await Ordershop.findOne({
                include: [{
                    association: 'Shopcars', include: [{ association: 'product' }]
                }],
                where: { userId, status: 'en proceso' }
            });

            /*
            Aca tenes toda la informacion de la orden vigente del usuario, esta query trae
            todos los items asociados a la orden, y cada item tiene el producto asociado
            te falta en la vista iterar correctamente el array de items para mostrar los productos
            y hacer la suma de los precios, es decir el subtotal de cada item
            y el total de la orden
            */
            console.log('log de ordershop', ordershop); 


            const cart = await Shopcar.findAll({
                where: { ordershopId: ordershop.id },
                include: ['product']
            });

            console.log('log de cart', cart);


            return res.render('products/shopCar', {
                title: 'Tu carrito',
                user: true,
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
                where: { userId },
            });
            if (!order) {
                order = await Ordershop.create({ usersId: userId, total: 0 });
            }


            let item = await Shopcar.findOne({
                where: {
                    ordershopId: order.id,
                    productId: productId,
                },
            });

            if (item) {
                item.cant += Number(quantity);
                await item.save();
            } else {
                await Shopcar.create({
                    ordershopId: order.id,
                    productId: productId,
                    cant: 1,
                });
            }
            console.log(item);


            return res.redirect('/product');
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
            console.log('cantidad de productos', quantity);


            const order = await Ordershop.findOne({
                where: { users_id: userId },
            });

            const item = await Shopcar.findOne({
                where: {
                    ordershopId: order.id,
                    productId: productId,
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
                where: { userId: userId },
            });

            await Shopcar.destroy({
                where: {
                    ordershopId: order.id,
                    productId: productId,
                },
            });

            return res.redirect('/shopcar');
        } catch (error) {
            console.log("Error al eliminar producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    clearCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const order = await Ordershop.findOne({
                where: { userId: userId },
            });

            await Shopcar.destroy({
                where: { ordershopId: order.id },
            });

            return res.redirect('/shopcar');
        } catch (error) {
            console.log("Error al vaciar carrito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
};

module.exports = shopCarController;
