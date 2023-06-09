var bcrypt = require("bcrypt");
var jwtUtils = require("../utils/jwt.utils");
var models = require("../models");

// Routes
module.exports = {
  reg: function (req, res) {
    // Params
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var formation = req.body.formation;
    var email = req.body.email;
    var tel = req.body.tel;

    if (nom == null || prenom == null || formation == null || email == null || tel == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    models.etudiant.findOne({
      attributes: ["email"],
      where: { email: email },
    })
      .then(function (userFound) {
        if (!userFound) {
          var newEtudiant = models.etudiant.create({
            nom: nom,
            prenom: prenom,
            formation: formation,
            email: email,
            tel: tel
          })
            .then(function (newEtudiant) {
              return res.status(201).json({
                userId: newEtudiant.id,
                token: jwtUtils.generateTokenForUser(userFound),
              });
            })
            .catch(function (err) {
              return res.status(500).json({ error: "cannot add user" });
            });
        } else {
          return res.status(409).json({ error: "user already exists" });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: "unable to verify user" });
      });
  },

  login: function (req, res) {
    // Params
    var email = req.body.email;

    if (email == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    // Check if the user exists in the database
    models.etudiant.findOne({
      where: { email: email },
    })
      .then(function (userFound) {
        if (userFound) {
          return res.status(200).json({
            userId: userFound.id,
            token: jwtUtils.generateTokenForUser(userFound),
          });
        } else {
          return res.status(404).json({ error: "user not found" });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: "unable to verify user" });
      });
  },
};
