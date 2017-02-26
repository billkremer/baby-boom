var verbose = true; // lets messages be turned off for non-error console.logs

var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

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
            user: 'baby.boom.booker@gmail.com', // Your email id
            pass: 'gasstationtvstory' // Your password
        } // end auth
    }); // end createTransport

    var textEmail = mailData.babyName + " is " + mailData.months + mailData.monthsText + "!\n";

    var htmlEmail = "<div align='center' style='border: 1px solid black;padding:5px 5px; margin: auto auto;'>"
    htmlEmail += "<h1 align='center'>" + mailData.babyName +  " </h1>";
    htmlEmail += "<h2>" + mailData.months + mailData.monthsText + "</h2>";


    mailData.aches.forEach( function (indivAch) {
      textEmail += indivAch.achievement_completed_date_string + " -- " + indivAch.achievement_completed_text + " -- " + indivAch.achievement_completed_comment;

      htmlEmail += "<p style='font-size:1.5em;'>" + indivAch.achievement_completed_date_string + " -- " + indivAch.achievement_completed_text + " -- " + indivAch.achievement_completed_comment + "</p>";
    });



    //set up options
    var mailOptions = {
      from: "Baby-Boom Booker <baby.boom.booker@gmail.com>", // sender address
      to: contactsArray, //receiver

      subject: 'Update from '+ req.user.user_fullname  + ' via Baby-Boom', //subject line
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


// new email { id: 5,
//   babyName: 'Kathy',
//   months: 1,
//   monthsText: ' month old',
//   photo:
//    { id: 13,
//      userid: 5,
//      picture_url: 'https://baby-boom.s3.amazonaws.com/1487862991520user5',
//      picture_comment: 'another beautiful photo',
//      picture_originalname: 'P5100002.JPG',
//      select: true },
//   aches:
//    [ { id: 43,
//        userid: 5,
//        achievement_id: 1,
//        achievement_completed_text: 'Begins to smile at people',
//        achievement_completed_date: '2017-02-21T06:00:00.000Z',
//        achievement_completed_comment: 'smiled at gradma',
//        select: true,
//        achievement_completed_date_string: 'Tue Feb 21 2017' },
//      { id: 40,
//        userid: 5,
//        achievement_id: 1000021,
//        achievement_completed_text: 'new achievemnets',
//        achievement_completed_date: '2017-02-20T06:00:00.000Z',
//        achievement_completed_comment: 'grandpa',
//        select: true,
//        achievement_completed_date_string: 'Mon Feb 20 2017' } ],
//     contacts:
  //  [ { id: 1,
  //      userid: 5,
  //      contactname: 'Bill',
  //      contactemail: 'bhkremer@hotmail.com' },
  //    { id: 11,
  //      userid: 5,
  //      contactname: 'Bill2',
  //      contactemail: 'bkrems12@yahoo.com' } ] } anonymous {
  // id: 5,
//   username: '4@4',
//   password: '$2a$10$9xz7IrMbNJNXLhK/p38oQOOagf5WchKd/rzwhM6uXoilg7JjafUnK',
//   user_baby_name: 'Kathy',
//   user_baby_birthday: 2017-01-14T06:00:00.000Z,
//   user_fullname: 'asdf' }



module.exports = router;
