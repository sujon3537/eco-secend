const nodemailer = require('nodemailer');

async function emailSender(email, verify, template){
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
        subject: "Verify your email", // Subject line
        html: template(verify), // html body
    });
}

module.exports = emailSender;