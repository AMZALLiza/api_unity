var bcrypt = require("bcrypt");
var jwtUtils = require("../utils/jwt.utils");
var models = require("../models");

//routes
module.exports = {
  register: function (req, res) {
    //param
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    //vérifier pseudo mail etc

    models.User.findOne({
      attributes: ["email"],
      where: { email: email },
    })
      .then(function (userFound) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            var newUser = models.User.create({
              email: email,
              username: username,
              password: bcryptedPassword,
              bio: bio,
              isAdmin: 0,
            })
              .then(function (newUser) {
                return res.status(201).json({
                  userId: newUser.id,
                  token: jwtUtils.generateTokenForUser(userFound),
                });
              })
              .catch(function (err) {
                return res.status(500).json({ error: "cannot add user" });
              });
          });
        } else {
          return res.status(409).json({ error: "user already exist" });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: "unable to verify user" });
      });
  },
  login: function (req, res) {
    // Params
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ error: "missing parameters" });
    }

    // Check if the user exists in the database
    models.User.findOne({
      where: { email: email },
    })
      .then(function (userFound) {
        if (userFound) {
          // Compare the provided password with the hashed password stored in the database
          bcrypt.compare(password, userFound.password, function (err, result) {
            if (result) {
              return res.status(200).json({
                userId: userFound.id,
                token: jwtUtils.generateTokenForUser(userFound),
              });
            } else {
              return res.status(401).json({ error: "invalid password" });
            }
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
