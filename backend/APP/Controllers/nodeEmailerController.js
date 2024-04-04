const transporter = require('../Models/nodeEmailer_model')

const SendEmail = (message, header, userEmail)=>{
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: userEmail,
    subject: header,
    text: message
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error occurred:', error);
    } else {
        console.log('Email sent:', info.response);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  });
  
}


module.exports ={
  SendEmail
}