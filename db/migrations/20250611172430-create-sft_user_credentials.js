'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sft_user_credentials', {
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.STRING,
        unique:true,
        autoIncrement: false,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      user_type: {
        type: Sequelize.TINYINT,
        references: {
          model: 'sft_user_type',
          key: 'id'
        },
        allowNull: false
      },
      login_status: {
        type: Sequelize.TINYINT,
        allowNull: false
      }
      
    }, {
      timestamps:true
      }
  );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sft_user_credentials');
  }
};
