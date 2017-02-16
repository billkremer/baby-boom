const router = require('express').Router();
var passport = require('passport');
var User = require('../models/user');
var pool = require("../db/connection");



router.get('/',  function(req, res){
  console.log('gothere profile?', req.user);
  res.status(200).send(req.user);
  // res.sendStatus(200);
});

router.put('/', function(req, res) {
  console.log('gethere profileput', req.body);

  query("UPDATE users SET user_fullname = $2, user_baby_name = $3, user_baby_birthday = $4 WHERE id = $1 RETURNING *",
  [ req.body.id, req.body.realName, req.body.babyName, req.body.babyBirthday]
)

  res.sendStatus(200);

})

module.exports = router;



// //
// //
// exports.create = function(username, password, fullname, baby_name, baby_birthday) {
//   return bcrypt
//     .hash(password, SALT_ROUNDS)
//     .then(function(hash) {
//       return query(
//         "INSERT INTO users (username, password, user_fullname, user_baby_name, user_baby_birthday) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//         [ username, hash , fullname, baby_name, baby_birthday]
//       ).then(function(users) {
//         return users[0];
//       });
//     })
//     .catch(function(err) {
//       console.log("Error creating user", err);
//     });
// };

//
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
//
