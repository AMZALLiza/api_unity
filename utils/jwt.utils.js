var jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "0djbe23njeijfeih45jefhzeofpz224ezgethry346vfdthrh234";
//exported functions
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  },
};
