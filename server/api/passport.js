const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

require('dotenv').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

var _accessToken;
var _profile;

passport.use(
    new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    console.log("Google strategy callback called");
    profile.accessToken = accessToken;
    _accessToken = accessToken;
    console.log("Profile:", profile);
    done(null, profile);
  }
 )
);

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});
