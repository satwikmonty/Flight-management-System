'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_reservation', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: false
      },
      user_id :{
        type: Sequelize.INTEGER,
        references: {
          model: 'sft_user_credentials',
          key: 'id'
        }
      },
      scheduled_id :{
        type: Sequelize.INTEGER,
        references: {
          model: 'sft_schedule',
          key: 'id'
        }
      },
      reservation_number : {
        type: Sequelize.STRING(100),
        unique:true,
        allowNull: false
      },
      seat_type: {
        type: Sequelize.ENUM('economy', 'business'),
        allowNull: false
      },
      booking_date : {
        type:Sequelize.DATE,
        allowNull:false
      },
      journey_date : {
        type:Sequelize.DATE,
        allowNull:false
      },
      total_seats : {
        type: Sequelize.MEDIUMINT,
        allowNull:false
      },
      total_fare : {
        type: Sequelize.DECIMAL(10,3),
        allowNull:false
      },
      booking_status : {
        type: Sequelize.STRING(30),
        allowNull:false
      }
      
    }, {
      timestamps:true
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_reservation');
  }
};