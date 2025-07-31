const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../../sft-flight-management-service/src/integration/rds/index.ts');

console.log('sequelize:', sequelize);


class Flight extends Model {}

Flight.init({
      id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        field:'id'
      },
      flightNumber: {
        type: DataTypes.STRING(10),
        unique:true,
        autoIncrement: false,
        allowNull: false,
        field:"flight_number"
      },
      flight_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      economy_seating_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      business_seating_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      economy_reservation_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      business_reservation_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      seat_type: {
        type: DataTypes.ENUM('economy', 'business'),
        allowNull: false,
        defaultValue: 'economy'
      }
    }, {
    sequelize,
    modelName: 'Flight',
    tableName: 'sft_flight',
    timestamps: true,
  });

module.exports = Flight;