'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    idUSERS: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Message.belongsTo(models.User, {
          foreignkey: {
            allowNull: false
          }
        })
      }
    }
  });

  return Message;
};