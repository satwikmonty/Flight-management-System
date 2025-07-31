'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_flight', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      flight_number: {
        type: Sequelize.STRING(10),
        unique:true,
        autoIncrement: false,
        allowNull: false
      },
      flight_name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      economy_seating_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      business_seating_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      economy_reservation_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      business_reservation_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seat_type: {
        type: Sequelize.ENUM('economy', 'business'),
        allowNull: false,
        defaultValue: 'economy'
      }
      
      
    }, {
      timestamps:true
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_flight');
  }
};
