import { DataTypes, Model } from 'sequelize';
const sequelize = require('../connection');

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sft_user_credentials',
        key: 'id',
      },
    },
    scheduled_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sft_schedule',
        key: 'id',
      },
    },
    reservation_number: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    seat_type: {
      type: DataTypes.ENUM('economy', 'business'),
      allowNull: false,
    },
    booking_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    journey_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_seats: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
    },
    total_fare: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
    },
    booking_status: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
    tableName: 'sft_reservation',
    timestamps: true,
  }
);

module.exports = Reservation;
