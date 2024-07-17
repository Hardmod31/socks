'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sock extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.Basket, { foreignKey: 'userId' });
      this.hasMany(models.Favorite, { foreignKey: 'userId' });
    }
  }
  Sock.init({
    userId: DataTypes.INTEGER,
    pattern: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    img: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Sock',
  });
  return Sock;
};