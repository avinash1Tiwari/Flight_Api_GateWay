'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const {ServerConfig} = require('../config')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{through :'User_Roles',as:'role'})
       
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,50]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user){

    console.log("bfore encryption : " + user.password)

    // before using environmental-variable
    // const encryptedPassword = bcrypt.hashSync(user.password,10);


    const encryptedPassword = bcrypt.hashSync(user.password,+ServerConfig.SALT_ROUND);
    user.password = encryptedPassword
    console.log("after encryption : " + user.password)
  })


  return User;
};