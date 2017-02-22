var verbose = true;

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var multer = require('multer');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var s3 = new aws.S3();


var pool = require("../db/connection");
var bodyParser = require("body-parser");
router.use(bodyParser.json());


var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'baby-boom',//alternately, if you are not using a .env file you can just use a string for the name of your bucket here, 'your-bucket-name'
    acl: 'public-read',//default is private, set to public-read is so the public can view your pictures
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+"user"+req.user.id); // uses the date for a filename?
    }
  })

});

router.post('/', upload.single('file'), function (req, res) {
if (verbose) console.log('photos.js', req.body, req.file, req.user);

//   var newUpload = {
//     created: Date.now(),
//     file: req.file,
//     comment: req.body.comment,
//   };
//
// console.log('newUpload',newUpload);

//   query("INSERT INTO pictures (userid, picture_url, picture_comment, picture_originalname) VALUES ($1, $2, $3, $4)",
//   [ req.user.id, req.file.location, req.body.comment, req.file.originalname]
// )



  pool.connect(function(err, client, done) {
    if (err) {
      if (verbose) console.log("Error connecting to database", err);
      res.sendStatus(500);
      done(); // returns the connection
    } else {
      client.query("INSERT INTO pictures (userid, picture_url, picture_comment, picture_originalname) VALUES ($1, $2, $3, $4)", [ req.user.id, req.file.location, req.body.comment, req.file.originalname],
      function(err, result) {
        done();
        if (err) {
          if (verbose) console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          //     if (verbose) console.log("Got get info from DB", result.rows);
          res.send(result.rows);
        };
      });  // closes client query
    }; // closes initial else
  }); // closes pool.connection
}); // closes post


router.get('/', function (req, res) {
    if (verbose) console.log('get photos',req.body, req.user);

  pool.connect(function(err, client, done) {
    if (err) {
      if (verbose) console.log("Error connecting to database", err);
      res.sendStatus(500);
      done(); // returns the connection
    } else {
      client.query("SELECT * FROM pictures WHERE userid = $1 ORDER BY id DESC", [req.user.id],
      function(err, result) {
        done();
        if (err) {
          if (verbose) console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          //     if (verbose) console.log("Got get info from DB", result.rows);
          res.send(result.rows);
        };
      });  // closes client query
    }; // closes initial else
  }); // closes pool.connection
}); // closes get



module.exports = router;

// //shortens the typical error checking
// function query(sqlString, data) {
//   return new Promise(function(resolve, reject) {
//     pool.connect(function(err, client, done) {
//       try {
//         if (err) {
//           return reject(err);
//         }
//
//         client.query(sqlString, data, function(err, result) {
//           if (err) {
//             return reject(err);
//           }
//
//           resolve(result.rows);
//         });
//       } finally {
//         done();
//       }
//     });
//   });
// }
