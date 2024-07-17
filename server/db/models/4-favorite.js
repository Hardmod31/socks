'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Sock, { foreignKey: 'sockId' });
    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    sockId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};