'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Sock, { foreignKey: 'sockId' });
    }
  }
  Basket.init({
    userId: DataTypes.INTEGER,
    sockId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};