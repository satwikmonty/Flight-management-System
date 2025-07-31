const { DataTypes } = require('sequelize');
const {Model} =require('sequelize');
const sequelize = require('../connection');

class Schedule extends Model {}

Schedule.init(
  {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: false
      },
      flight_id: {
        type: DataTypes.INTEGER,
        references:{
          model: 'sft_flight',
          key:'id'
        },
        allowNull:false
      },
      travel_duration : {
        type: DataTypes.FLOAT(7,3),
        allowNull: false
      },
      available_days: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      departure_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      route_id : {
        type: DataTypes.INTEGER,
        references: {
          model: 'sft_route',
          key: 'id'
        }
      },
  },
  {
    sequelize,
    modelName: 'Schedule',
    tableName: 'sft_schedule',
    timestamps: true,
  }
);

module.exports = Schedule;