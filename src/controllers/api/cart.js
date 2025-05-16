const { Association } = require("sequelize");
const { Shopcar, Ordershop } = require("../../database/models");

const shopCarController = {
    addToCart: async (req, res) => {
        console.log("Request body:", req.body);

        try {
            const { productId, quantity, userId } = req.body;

            if (!productId || !quantity) {
                return res.status(400).json({ error: "Faltan datos" });
            }

            if (isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({ error: "Cantidad inválida" });
            }

            if (isNaN(productId) || productId <= 0) {
                return res
                    .status(400)
                    .json({ error: "ID de producto inválido" });
            }

            let order = await Ordershop.findOne({
                where: {
                    userId,
                    status: "en proceso",
                },
            });

            console.log("Order found:", order);

            if (!order) {
                order = await Ordershop.create({
                    userId,
                    total: 0,
                    status: "en proceso",
                });
            }

            let item = await Shopcar.findOne({
                where: {
                    ordershopId: order.id,
                    productId: productId,
                },
                include: { association: "product" },
            });

            console.log("Item found:", item);

            if (item) {
                item.quantity += Number(quantity);
                console.log("Updated quantity:", item.quantity);
                await item.save();
            } else {
                const art = await Shopcar.create({
                    ordershopId: order.id,
                    productId: productId,
                    quantity,
                });
                // order -> items -> product => product * quantity
                //as : ordershop
                console.log("Item created:", art);
            }
            //            console.log("total por este articulo",item.product.price * item.quantity);

            const items = await Shopcar.findAll({
                where: {
                    ordershopId: order.id,
                },
                include: { association: "product" },
            });

            console.log("Items found:", items);

            let total = 0;
            items.forEach((item) => {
                total += item.product.price * item.quantity;
            });

            console.log("Total:", total);
            order.total = total;
            await order.save();

            return res
                .status(200)
                .json({ message: "Producto agregado al carrito" });
        } catch (error) {
            console.log("Error al agregar producto:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    update: async (req, res) => {
        try {
            const { userId, quantity } = req.body;
            const productId = req.params.id;

            console.log("datos recibidos:", {
                userId: userId,
                quantity: quantity,


            });
            
            if (isNaN(quantity)) {
                return res.status(400).json({ error: "Cantidad inválida" });
            }

            const order = await Ordershop.findOne({
                where: { userId: userId },
            });

            console.log('encontramos order?', order);
            

            const item = await Shopcar.findOne({
                where: {
                    ordershopId: order.id,
                    productId: productId,
                },
            });

            console.log('item encontrado?', item);
            

            console.log("Buscando item con:", {
                ordershopId: order.id,
                productId: productId,
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

    removeElementCar: async (req, res) => {
        try {
            
            
            const userId = req.session.user.id;
            const { id } = req.params;
            
            

            const order = await Ordershop.findOne({
                where: { userId: userId },
            });

            
            

            await Shopcar.destroy({
                where: {
                    ordershopId: order.id,
                    productId: id,
                },
            });
            console.log('se elimino producto', id);
            

            return res
                .status(200)
                .json({ message: "Producto eliminado del carrito" });
        } catch (error) {
            console.log("Error al eliminar producto:", error);
            
            //res.status(500).json({ error: "Error interno del servidor" });
        }
    },


    clearShopCart: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const order = await Ordershop.findOne({
                where: { userId: userId },
            });

            await Shopcar.destroy({
                where: { ordershopId: order.id },
            });

            return res.json({ message: "Carro limpio"})
        } catch (error) {
            console.log("Error al vaciar carrito:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
};

module.exports = shopCarController;
