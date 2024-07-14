const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"ajaysbiradar3@gmail.com",
      pass: "lqhvdmghcavraxop"
    }
})

const sendMail = asyncHandler( async (req,res)=>{
    console.log(req.body);    
    const {comment, subject, mail} = req.body;
    const mailOptions = {
        from: 'ajaysbiradar3@gmail.com',
        to: 'sbmunnu@gmail.com',
        subject: subject,
        text: comment + "got the comment from an user with an mail - "+ mail
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.send({success:false})
        } 
        else {
          console.log('Email is sent', info.response);
        }
    });
    res.send({success:true});
});

module.exports = {sendMail}