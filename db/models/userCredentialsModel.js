const { DataTypes } = require('sequelize');
const {Model} =require('sequelize');
const sequelize = require('../connection');

class UserCredentials extends Model {}

UserCredentials.init(
  {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.STRING,
        unique:true,
        autoIncrement: false,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      user_type: {
        type: DataTypes.TINYINT,
        references: {
          model: 'sft_user_type',
          key: 'id'
        },
        allowNull: false
      },
      login_status: {
        type: DataTypes.TINYINT,
        allowNull: false
      },
  },
  {
    sequelize,
    modelName: 'UserCredentials',
    tableName: 'sft_user_credentials',
    timestamps: true,
  }
);

module.exports = UserCredentials;
