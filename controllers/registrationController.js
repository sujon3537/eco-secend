const emailValidation = require('../helpers/emailValidation');
const { model } = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const emailSender = require('../helpers/emailSender.js')
const otpTemplate = require('../helpers/otpTemplate.js')
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

const registrationController = async (req, res) => {
    const {fullname, email, password, avatar, facebookId, linkedinId} = req.body;
    
    if(!fullname){
        return res.send({error: "Enter fullname"})
    }
    else if(!email){
        return res.send({error: "Enter email"})
    }
    else if(!emailValidation(email)){
        return res.send({error: "Enter valid email"})
    }
    else if(!password){
        return res.send({error: "Enter password"})
    }
    else{

        let duplicateEmail = await User.find({email: email})
        
        if(duplicateEmail.length > 0){
            return res.send({error: "Email already exist!"})
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            const user = new User({
                fullname,
                email,
                password: hash,
                avatar, 
                facebookId, 
                linkedinId
            })

            user.save();

            const otpGenerator = aleaRNGFactory(Date.now());
            let otpnumber = otpGenerator.uInt32().toString().substring(0, 4)

            let randomOtpStore = await User.findOneAndUpdate(
                {email},
                {$set: {randomOtp: otpnumber}},
                {new: true}
            )

            emailSender(email, otpnumber, otpTemplate)
            
            setTimeout( async function(){
                let randomOtpRemove = await User.findOneAndUpdate(
                    {email},
                    {$unset: {randomOtp: ""}},
                    {new: true}
                )
            }, 60000)

            res.send({
                success: "Registration is successful",
                fullname: user.fullname,
                email: user.email
            })
        });
    }
}

module.exports = registrationController;