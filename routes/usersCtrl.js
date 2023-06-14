var bcrypt = require("bcrypt");
var jwtUtils = require("../utils/jwt.utils");
var models = require("../models");

//routes
module.exports = {
  register: function (req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;
    var tel = req.body.tel;
    var formation = req.body.formation;
    var isAdmin = req.body.isAdmin;
    /**
     var name = req.body.name;
     var firstname = req.body.first_name;
     var zipcode = req.body.first_name;
     var city = req.body.city;
     var interest = req.body.interest;
     */

    models.User.findOne({
      attributes: ['email'],
      where: { email: email },
    })
      .then(function (userFound) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, hashedPassword) {
            var newUser = models.User.create({
              email: email,
              username: username,
              password: hashedPassword,
              bio: bio,
              isAdmin: isAdmin || false,
              formation: formation,
              tel: tel,
            })
              .then(function (newUser) {
                console.log("New user created:", newUser);
                return res.status(201).json({
                  userId: newUser.id,
                  token: jwtUtils.generateTokenForUser(newUser),
                });
              })
              .catch(function (err) {
                console.log("Error creating new user:", err);
                return res.status(500).json({ error: "cannot add user" });
              });
          });
        } else {
          return res.status(409).json({ error: "user already exists" });
        }
      })
      .catch(function (err) {
        console.log("Error finding user:", err);
        return res.status(500).json({ error: "unable to find user" });
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
