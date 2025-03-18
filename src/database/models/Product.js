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
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
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