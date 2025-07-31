const { DataTypes } = require('sequelize');
const {Model} =require('sequelize');
const sequelize = require('../connection');

class UserProfile extends Model {}

UserProfile.init(
  {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references:{
          model: 'sft_user_credentials',
          key:'id'
        },
        allowNull:false
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING(18),
        allowNull: false
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      pincode: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      mobile_no: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
  },
  {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'sft_user_profile',
    timestamps: true,
  }
);

export default UserProfile;
