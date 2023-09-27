const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');

require('dotenv').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIS_PASS = process.env.REDIS_PASS;

let redisClient;

(async () => {

 //redisClient = await redis.createClient({
 // url: 'redis://vidset:'+REDIS_PASS+'@192.168.10.17:6379'
 //})
  redisClient = await redis.createClient({
    url: REDIS_PASS,
  });

  redisClient.on("error", (error) => console.error(`Error: ${error}`));

  await redisClient.connect();
})();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: "Hello from server!"});
});

// Use express-session to manage sessions
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/callback', // Your callback URL
    },
    (token, tokenSecret, profile, done) => {
      // You can store user information in your database here or perform other tasks
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  done(null, user);
});

// Sign in with Google
app.get('/auth/SignIn', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback URL for authentication
app.get(
  '/auth/callback',
  passport.authenticate('google', {failureRedirect: '/' }),
async (req, res) => {
  redisClient.set(session, req.session.passport.user);

  res.redirect("http://localhost:3000");
}
);

app.get('/auth/profile', async (req, res) => {
 let userSession =  await redisClient.get(session);
  console.log(userSession);
 // if (userSession.user.DisplayName != null){
  //  res.json({isAuthenticated: true, username: req.session.userDisplayName});
 // } else {
 //   res.json({isAuthenticated: false, username: ""});
 // }
})

// Logout
app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
