"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Shopcar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Shopcar.belongsTo(models.Ordershop, {
                as: "ordershop",
                foreignKey: "ordershopId",
            }),
                Shopcar.belongsTo(models.Product, {
                    as: "product",
                    foreignKey: "productId",
                });
        }
    }
    Shopcar.init(
        {
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ordershopId: DataTypes.INTEGER,
            productId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Shopcar",
        }
    );
    return Shopcar;
};
