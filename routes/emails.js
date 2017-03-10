var verbose = true; // lets messages be turned off for non-error console.logs

var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var dotenv = require('dotenv').config();
// probably not necessary...
// var pool = require("../db/connection");
//
// var bodyParser = require("body-parser");
// router.use(bodyParser.json());


router.post('/', function (req, res) {
  //  if (verbose) console.log('new email',req.body, req.user); // see below

    var mailData = req.body;
    var contactsArray = [req.user.username];



    mailData.contacts.forEach(function (aContact) {
      contactsArray.push('"'+ aContact.contactname +'" <' +aContact.contactemail+'>');
    });
    //  console.log(contactsArray);



    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'baba.baby.boom@gmail.com', // Your email id
            pass: process.env.GMAIL_PASS // Your password
        } // end auth
    }); // end createTransport

    var textEmail = mailData.babyName + " is " + mailData.months + mailData.monthsText + "!\n";

    var htmlEmail = "<div align='center' style='border: 1px solid black;padding:5px 5px; margin: auto auto;'>"
    htmlEmail += "<h1 align='center'>" + mailData.babyName +  " </h1>";
    htmlEmail += "<h2>" + mailData.months + mailData.monthsText + "</h2>";


    mailData.aches.forEach( function (indivAch) {

      var commentString = "";

      if (!(indivAch.achievement_completed_comment == "NULL" || indivAch.achievement_completed_comment == "" || indivAch.achievement_completed_comment == null || indivAch.achievement_completed_comment == "null")) {
        commentString = " -- " + indivAch.achievement_completed_comment;
      };

      textEmail += indivAch.achievement_completed_date_string + " -- " + indivAch.achievement_completed_text + commentString;

      htmlEmail += "<p style='font-size:1.5em;'>" + indivAch.achievement_completed_date_string + " -- " + indivAch.achievement_completed_text + commentString + "</p>";
    });


    //set up options
    var mailOptions = {
      from: "Baba Baby Boom <baba.baby.boom@gmail.com>", // sender address
      to: contactsArray, //receiver
      replyTo: "Baba_Baby_Boom_cannot_reply_to_emails_@_",

      subject: 'Update from '+ req.user.user_fullname  + ' via Baba Baby Boom', //subject line
      text: textEmail, // plain text
      html: htmlEmail, //html
      attachments: [{   // use URL as an attachment
            filename: mailData.photo.picture_originalname,
            path: mailData.photo.picture_url
        }]
    }; // end mailOptions object

    console.log(mailOptions.attachments);

    //send the email
    transporter.sendMail( mailOptions, function(error, message ) {
      //if there was an error, log it
      if (error) {
        console.log(error);
        res.sendStatus(500);
      // else, print success message
      } else {
        console.log('Message %s sent: %s', message.messageId, message.response);
        res.sendStatus(201);
      } // end else
    }); // end sendMail

}); // end post

module.exports = router;
