const emailValidation = require("../helpers/emailValidation.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.send({ error: "Enter email" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Enter valid email" });
  } else if (!password) {
    return res.send({ error: "Enter password" });
  } else {
    let existingEmail = await User.find({ email });
    if (existingEmail.length > 0) {
      bcrypt
        .compare(password, existingEmail[0].password)
        .then(function (result) {
          if (result) {
            res.send({
              success: "Login successful",
              fullname: existingEmail[0].fullname,
              email: existingEmail[0].email,
              role: existingEmail[0].role,
            });
          } else {
            res.send({ error: "Password doesn't matched!" });
          }
        });
    } else {
      res.send({ error: "Email doesn't matched!" });
    }
  }
};

module.exports = loginController;
