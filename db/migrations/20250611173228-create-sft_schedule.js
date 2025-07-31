'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_schedule', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: false
      },
      flight_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'sft_flight',
          key:'id'
        },
        allowNull:false
      },
      travel_duration : {
        type: Sequelize.FLOAT(7,3),
        allowNull: false
      },
      available_days: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      departure_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      route_id : {
        type: Sequelize.INTEGER,
        references: {
          model: 'sft_route',
          key: 'id'
        }
      }
      
    }, {
      timestamps:true
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_schedule');
  }
};