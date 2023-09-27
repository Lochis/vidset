var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config()

var userProfile;
var accessToken;


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      userProfile.accessToken = accessToken;

      console.log("on passport side: ", accessToken);
      return done(null, userProfile);
  }
));

/* GET home page. */
router.get('/signIn',
    passport.authenticate('google', { scope : ['profile', 'email', 'https://www.googleapis.com/auth/youtube'] })
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
        res.redirect('/profile');
    });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

router.get('/profile', ensureAuthenticated, (req,res) => {
  res.json('${req.user.displayName}');
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
