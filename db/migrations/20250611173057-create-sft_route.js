'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_route', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      source: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      distance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      fare: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      }
      
    }, {
      timestamps:false
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_route');
  }
};
