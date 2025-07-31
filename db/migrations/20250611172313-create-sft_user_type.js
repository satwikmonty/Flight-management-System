'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_user_type', {
      id:{
        type:Sequelize.TINYINT,
        primaryKey:true,
        autoIncrement: false,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      is_active: {
        type: Sequelize.TINYINT,
        allowNull: false
      }
      
    }, {
      timestamps:true
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_user_type');
  }
};
