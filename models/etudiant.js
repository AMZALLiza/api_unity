'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var Etudiant = sequelize.define('Etudiant', {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    formation: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.INTEGER
  } , {
    classMethods: {
      associate: function(models) {
        models.Etudiant.hasMany(models.Message);
      }
    }
  });

  return Etudiant;

};