const { DataTypes } = require('sequelize');
const {Model} =require('sequelize');
const sequelize = require('../connection');

class UserType extends Model {}

UserType.init(
  {
    id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserType',
    tableName: 'sft_user_type',
    timestamps: true,
  }
);

module.exports = UserType;
