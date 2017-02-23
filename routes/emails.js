var nodemailer = require("nodemailer");

var express = require("express");
var router = express.Router();


var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "baby.boom.booker@gmail.com",
       pass: "gmailPassword"
   }
});

smtpTransport.sendMail({  //email options
   from: "Baby-Boom Booker <baby.boom.booker@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
   to: "Receiver Name <receiver@email.com>", // receiver
   subject: "Emailing with nodemailer", // subject
   text: "Email Example with nodemailer" // body


}, function(error, response){  //callback
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }

   smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
});







var nodemailer = require('nodemailer');

var router = express.Router();
app.use('/sayHello', router);

router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'baby.boom.booker@gmail.com', // Your email id
            pass: 'password' // Your password
        }
    });
    ...
    ...
    ...
}

var text = 'Hello world from \n\n' + req.body.name;

var mailOptions = {
    from: 'example@gmail.com>', // sender address
    to: 'receiver@destination.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});


module.exports = router;
