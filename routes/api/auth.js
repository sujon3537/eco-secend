const express = require("express");
const _ = express.Router();
const registrationController = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const emailVerificationOtpMatch = require("../../controllers/emailVerifyOtpMatch");
const forgotPasswordController = require("../../controllers/forgotPasswordController");
const resetPasswordController = require("../../controllers/resetPasswordController");

_.post("/registration", registrationController);
_.post("/login", loginController);
_.post("/emailverificationotpmatch", emailVerificationOtpMatch);
_.post("/forgotpassword", forgotPasswordController);
_.post("/resetpassword", resetPasswordController);

module.exports = _;
