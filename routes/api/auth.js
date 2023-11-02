const express = require('express');
const _ = express.Router();
const registrationController = require('../../controllers/registrationController');
const loginController = require('../../controllers/loginController');
const emailVerificationOtpMatch = require('../../controllers/emailVerifyOtpMatch')



_.post('/registration', registrationController);
_.post('/login', loginController);
_.post('/emailverificationotpmatch', emailVerificationOtpMatch);


module.exports = _;