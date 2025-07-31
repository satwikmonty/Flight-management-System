const { DataTypes } = require('sequelize');
const {Model} =require('sequelize');
const sequelize = require('../connection');

class Route extends Model {}

Route.init(
  {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      source: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      distance: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      fare: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
  },
  {
    sequelize,
    modelName: 'Route',
    tableName: 'sft_route',
    timestamps: true,
  }
);

module.exports = Route;
