var verbose = true; // lets messages be turned off for non-error console.logs

var express = require("express");
var router = express.Router();

var pool = require("../db/connection");

var bodyParser = require("body-parser");
router.use(bodyParser.json());




router.put('/updateCompleted', function (req, res) {
    console.log('update completed',req.body, req.user);

    query("UPDATE achievement_data SET achievement_completed_date = $2, achievement_completed_comment = $3, achievement_completed_text = $4 WHERE id = $1 RETURNING *",
    [ req.body.id, req.body.achievement_completed_date, req.body.achievement_completed_comment, req.body.achievement_completed_text]
  )

    res.sendStatus(200);
});




router.get('/showCompleted', function (req, res) {
  console.log('show completed',req.body, req.user);


  var start_date = new Date(); //last three months of completed achievements
  // console.log(start_date);


  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to database", err);
      res.sendStatus(500);
      done(); // returns the connection
    } else {
      client.query("SELECT * FROM achievement_data WHERE userid = $1 AND achievement_completed_date < $2 AND achievement_completed_date > ($2::date - '3 month'::interval) ORDER BY achievement_completed_date DESC LIMIT 50;", [req.user.id, start_date],
      function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          //     if (verbose) console.log("Got get info from DB", result.rows);
          res.send(result.rows);
        };
      });  // closes client query
    }; // closes initial else
  }); // closes pool.connection
}); // closes get



router.post('/saveAchievement', function (req, res) {
  console.log(req.body, req.user);

  query("INSERT INTO achievement_data (userid, achievement_id, achievement_completed_text, achievement_completed_date, achievement_completed_comment) VALUES ($1, $2, $3, $4, $5)",
  [ req.user.id, req.body.id, req.body.achievement_text, req.body.achievementDate, req.body.achievementComment ]
)

  res.sendStatus(200);

});


router.get("/achmtsPlusMinusTwoMos", function(req, res) {  // getting achievements onto the page that haven't already been checked.
  // if (verbose) console.log('req', req.user, 'res',res);
//    console.log('achietplusmin',req.user.id);

    var currentBD = req.user.user_baby_birthday;

    // console.log(currentBD);
    // console.log(typeof currentBD);

    var start_date = new Date(currentBD); //Create start date object by passing appropiate argument
    var end_date = new Date(); // today
    var total_months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth() )  +  ( end_date.getDate() - start_date.getDate() ) /30 ;

    if (total_months < 1) { total_months = 1 }; // starts at one, so that the query will get up to 3 months to start.


// console.log((total_months - 2), (total_months + 2));


  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to database", err);
      res.sendStatus(500);
      done(); // returns the connection
    } else {
      client.query("SELECT achievements.id, achievement_age_months, achievement_text, achievement_placeholder FROM achievements LEFT JOIN (SELECT * FROM achievement_data WHERE (achievement_data.userid = $1 AND achievement_data.achievement_id < 1000000)) AS ache ON achievements.id = ache.achievement_id WHERE (ache.userid IS NULL OR ache.userid <> $1) AND achievement_age_months > $2 AND achievement_age_months < $3 ORDER BY achievement_age_months ASC, achievement_text;", [req.user.id, (total_months - 2), (total_months + 2) ],


// will need to JOIN to make sure the id  isn't in the other table

      function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
    //     if (verbose) console.log("Got get info from DB", result.rows);
          res.send(result.rows);
        };
      });  // closes client query
    }; // closes initial else
  }); // closes pool.connection
}); // closes get






router.get("/highestCustomAchievementID", function(req, res) {  // getting the highest number
  if (verbose) console.log('highest ID get!');

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to database", err);
      res.sendStatus(500);
      done(); // returns the connection
    } else {
      client.query( "SELECT MAX(achievement_id) FROM achievement_data;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
         if (verbose) console.log("Got get info from DB", result.rows);
          res.send(result.rows);
        };
      });  // closes client query
    }; // closes initial else
  }); // closes pool.connection
}); // closes get




router.post('/addCustomAchievement', function(req, res) {
  console.log('gethere addcustach post', req.body, req.user);

  query("INSERT INTO achievement_data (userid, achievement_id, achievement_completed_text, achievement_completed_date, achievement_completed_comment) VALUES ($1, $2, $3, $4, $5)",
  [ req.user.id, req.body.achievement_id, req.body.achievement_completed_text, req.body.achievement_completed_date, req.body.achievement_completed_comment ]
)

  res.sendStatus(200);

})



module.exports = router;


//shortens the typical error checking
function query(sqlString, data) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      try {
        if (err) {
          return reject(err);
        }

        client.query(sqlString, data, function(err, result) {
          if (err) {
            return reject(err);
          }

          resolve(result.rows);
        });
      } finally {
        done();
      }
    });
  });
}
