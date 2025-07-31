const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

class Passenger extends Model {}

Passenger.init(
  {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      reservation_id :{
        type: DataTypes.INTEGER,
        references: {
          model: 'sft_reservation',
          key: 'id'
        }
      },
      name : {
        type:DataTypes.STRING(255),
        allowNull:false
      },
      gender : {
        type:DataTypes.STRING(10),
        allowNull:false
      },
      age: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      seat_no : {
        type:DataTypes.STRING(10),
        allowNull:false
      },
  },
  {
    sequelize,
    modelName: 'Passenger',
    tableName: 'sft_passenger',
    timestamps: true,
  }
);

module.exports = Passenger;