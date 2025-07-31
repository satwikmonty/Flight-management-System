'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_passenger', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      reservation_id :{
        type: Sequelize.INTEGER,
        references: {
          model: 'sft_reservation',
          key: 'id'
        }
      },
      name : {
        type:Sequelize.STRING(255),
        allowNull:false
      },
      gender : {
        type:Sequelize.STRING(10),
        allowNull:false
      },
      age: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      seat_no : {
        type:Sequelize.STRING(10),
        allowNull:false
      }
      
    }, {
      timestamps:true
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_passenger');
  }
};