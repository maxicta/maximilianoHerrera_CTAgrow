const { Shopcar, Ordershop, Product } = require("../database/models");

shopCarController = {
    getCart: async (req, res) => {
        try {
            const userId = await req.session.user.id;

            const ordershop = await Ordershop.findOne({
                include: [
                    {
                        association: "Shopcars",
                        include: [{ association: "product" }],
                    },
                ],
                where: { userId, status: "en proceso" },
            });

            if (!ordershop) {
                return res.render("products/shopCar", {
                    title: "Tu carrito",
                    cart: [],
                    ordershop,
                    isLoggedIn: true,
                });
            }

            const cart = await Shopcar.findAll({
                where: { ordershopId: ordershop.id },
                include: [
                    {
                        model: Product,
                        as: "product", // este alias debe coincidir con el del modelo
                    },
                ],
            });

            let total = 0;
            cart.forEach((item) => {
                total += item.quantity * item.product.price;
            });
            console.log("datos de get.cart",{
                user: userId,
                ordershop: ordershop.id
            });
            

            return res.render("products/shopCar", {
                title: "Tu carrito",
                cart,
                total,
                ordershop,
                userId,
                user: true,
                isLoggedIn: true,
            });
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    addToCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { productId, quantity } = req.body;

            console.log("Datos recibidos:", { userId, productId, quantity });

            let order = await Ordershop.findOne({ where: { userId } });

            if (!order) {
                order = await Ordershop.create({ userId, total: 0 });
                console.log("Nueva orden creada:", order.id);
            }

            let item = await Shopcar.findOne({
                where: {
                    ordershopId: order.id,
                    productId: productId,
                },
            });

            if (item) {
                item.quantity += Number(quantity);
                await item.save();
                console.log("Producto existente actualizado");
            } else {
                await Shopcar.create({
                    ordershopId: order.id,
                    productId: productId,
                    quantity: Number(quantity),
                });
                console.log("Producto nuevo agregado");
            }

            console.log("AGREGANDO producto al carrito:", {
                productId,
                quantity,
            });

            return res.json({ message: "Producto agregado al carrito" });
        } catch (error) {
            console.error("Error al agregar producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    updateQuantity: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const { productId } = req.params;
            const { quantity } = req.body;

            if (isNaN(quantity)) {
                return res.status(400).json({ error: "Cantidad inválida" });
            }

            const order = await Ordershop.findOne({
                where: { userId: userId },
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

            console.log(
                `Actualizando producto ${productId} con cantidad:`,
                quantity
            );

            item.quantity = Number(quantity);

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
            console.log('se elimino producto del shopcar');
            

            return res.json({ message: "Producto eliminado"})
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

            return res.json({ message: "Carrito limpio"})
        } catch (error) {
            console.log("Error al vaciar carrito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
};

module.exports = shopCarController;
