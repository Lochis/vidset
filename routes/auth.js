var express = require('express');
var router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config()

var userProfile;


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

/* GET home page. */
router.get('/signIn',
    passport.authenticate('google', { scope : ['profile', 'email'] })
);

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        // Successful authentication, redirect success.
        res.redirect('/');
    });

router.get('/error', (req, res) => {
    res.send("error logging in")
});

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });


module.exports = router;
