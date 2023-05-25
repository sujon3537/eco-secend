const User = require("../models/userModel.js");

const emailVerificationOtpMatch = async (req, res) => {
    const {email, randomOtp} = req.body;

    let findOtp = await User.find({email})

    if(findOtp.length > 0){
        if(randomOtp == findOtp[0].randomOtp){
            res.json({"Succcess" : "Otp matched"})
            let removeOtpMatched = await User.findOneAndUpdate(
                {email},
                {$unset: {randomOtp: ""}},
                {new: true}
            )
        }
        else{
            res.json({"error" : "Otp doesn't matched!"})
        }
    }
}

module.exports = emailVerificationOtpMatch;