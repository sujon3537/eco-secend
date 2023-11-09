const emailValidation = require("../helpers/emailValidation.js");
const forgotPasswordTemplate = require("../helpers/forgotPasswordTemplate.js");
const User = require("../models/userModel.js");
const nodemailer = require("nodemailer");

let forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  let existingEmail = await User.find({ email: email });
  if (!email) {
    return res.send({ error: "Enter email!" });
  } else if (!emailValidation(email)) {
    return res.send({ error: "Enter valid email" });
  } else if (existingEmail.length == 0) {
    return res.send({ error: "Email not found!" });
  } else {
    res.send({ success: "Please, Check your email" });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "msisujon3110@gmail.com",
      pass: "ianljzcodqhescfb",
    },
  });

  let info = await transporter.sendMail({
    from: "msisujon3110@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Reset your password", // Subject line
    html: forgotPasswordTemplate(
      `http://localhost:5173/resetpassword?email=${email}`
    ), // html body
  });
};

module.exports = forgotPasswordController;
