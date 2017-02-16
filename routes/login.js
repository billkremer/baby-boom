const router = require('express').Router();
var passport = require('passport');

router.post('/', passport.authenticate('local'), function(req, res){
  console.log('gothere login.js?', req.user);
  res.sendStatus(200);
});

router.delete('/', function(req, res){
  req.logout();
  res.sendStatus(204);
});


router.get('/', passport.authenticate('local'), function(req, res){
  console.log('gothere profile?', req.user);
  res.status(200).send(req.user)
  // res.sendStatus(200);
});

module.exports = router;
