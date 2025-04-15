'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Categorie, {
        as: 'category',
        foreignKey: 'categorieId'
      }),
      Product.belongsTo(models.Brand, {
        as: 'brand',
        foreignKey: 'brandId'
      }),
      Product.belongsTo(models.Ordershop, {
        as: 'ordershop',
        foreignKey: 'orderShopId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "El nombre es obligatorio" },
        notEmpty: { msg: "El nombre no puede estar vacío" },
        len: {
          args: [5, 100],
          msg: "El nombre debe tener entre 5 y 100 caracteres"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "La descripción es obligatoria" },
        notEmpty: { msg: "La descripción no puede estar vacía" },
        len: {
          args: [10, 500],
          msg: "La descripción debe tener entre 10 y 500 caracteres"
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: "El precio es obligatorio" },
        isDecimal: { msg: "El precio debe ser un número decimal" },
        min: {
          args: [0.01],
          msg: "El precio debe ser mayor a 0"
        }
      }
    },
    image: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    categorieId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    orderShopId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};