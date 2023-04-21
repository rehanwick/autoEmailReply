const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, 
  auth: {
    user: 'sender.listed@outlook.com', 
    pass: 'Hurairah@123' 
  }
});


function sendEmailUsecase({from , to  , name }) {
    let mailOptions = {
      from: 'sender.listed@outlook.com', 
      to: to , 
      subject: 'Auto-REply', 
      text: `${name} thank you for replying this is a auto reply by listed your mail will be seen soon`, 
      html: `<b>${name} thank you for replying this is a auto reply by listed your mail will be seen soon</b>` 
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
}


module.exports = sendEmailUsecase ; 