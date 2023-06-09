'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    formation: DataTypes.STRING,
    tel: DataTypes.INTEGER
  } , {
    timestamps: false
  },
  {
    classMethods: {
      associate: function(models) {
        models.User.hasMany(models.Message);
      }
    }
  });

  return User;

};