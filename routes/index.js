var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');

var ffmpeg = require('fluent-ffmpeg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{
    username: req.user?.displayName,
    isAuth: req.isAuthenticated(),
  });
});


module.exports = router;
 