'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ordershop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ordershop.belongsTo(models.User, {
        as: 'ordershop',
        foreignKey: 'userId'
      })
      Ordershop.hasMany(models.Shopcar, {
        as: 'Shopcars',
        foreignKey: 'ordershopId'
      })
    }
  }
  Ordershop.init({
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ordershop',
  });
  return Ordershop;
};