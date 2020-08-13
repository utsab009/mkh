const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.get('/email_send', function(req, res) {
  let data = req.query;
  if (!Object.prototype.hasOwnProperty.call(data, 'email')) {
    return res.status(403).send({
      status: false,
      message: 'Email required',
    });
  }
  if (!Object.prototype.hasOwnProperty.call(data, 'message')) {
    return res.status(403).send({
      status: false,
      message: 'Massage required',
    });
  }
  // if (!Object.prototype.hasOwnProperty.call(data, 'sub')) {
  //   return res.status(403).send({
  //     status: false,
  //     message: 'Subject required',
  //   });
  // }

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'abhishek.bitcanny@gmail.com', // generated ethereal user
      pass: 'nzjanvqhfaeeroye', // generated ethereal password
    },
  });

  var mailOptions = {
    // from: 'abhishek.bitcanny@gmail.com',
    from: data.email,
    to: 'utsab@bitcanny.com',
    subject: 'Sector Requirement',
    text: data.message,
    html: `<p> Sender's email ID : ` + data.email + `</p><p>` + data.message + `</p>`,
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(403).send({
        status: false,
        error: error,
        message: 'Something error, please try after sometime',
      });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send({
        status: true,
        data: info.response,
        message: 'Email has been send successfully',
      });
    }
  });
});

module.exports = router;
