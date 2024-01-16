const express = require('express');
const router = express.Router();
const passport = require('passport');
const mysql = require('../api/mysql');

const CLIENT_URL = "http://localhost:3000/"

router.get("/login/success", async (req,res) => {
     if(req.user) {

        // Put user to database if not already in.
        const insertQuery = "INSERT IGNORE INTO users (id, name) VALUES (?, ?)";
        const values = [req.user.id, req.user.displayName];
        const result = await mysql({query: insertQuery, values});
        console.log("Result", result);

        res.status(200).json({
        success:true,
        message: "successful",
        user: req.user,
        //cookies: req.cookies
    });
 }
});

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        success:false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google",{ scope : ['profile', 'email', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/yt-analytics.readonly'] }));

router.get(
    "/callback", 
    passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
  module.exports = router;
