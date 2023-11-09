const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

let resetPasswordController = async (req, res) => {
  const { email, newPassword } = req.body;

  bcrypt.hash(newPassword, 10, async function (err, hash) {
    await User.findOneAndUpdate({ email }, { password: hash });

    res.send({
      success: "Password changed successfully!",
    });
  });
};

module.exports = resetPasswordController;
