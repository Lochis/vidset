var express = require('express');
var router = express.Router();
const passport = require('passport');
const formidable = require('formidable');
const { google } = require('googleapis');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

var inputFilePath;
var name;
var youtubeClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()){
    initYoutubeClient(req.user.accessToken);
  }
    res.json({
      message: "pass videos in db",
      });
});

function initYoutubeClient(accessToken){
  youtubeClient = google.youtube({
    version: 'v3',
    auth: accessToken,
  });
}

module.exports = router;
