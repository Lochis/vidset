var express = require('express');
var router = express.Router();
const passport = require('passport');
const formidable = require('formidable');
const { google } = require('googleapis');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config()

var inputFilePath;
var name;
var youtubeClient;
var ytAnalytics;
var channelId;

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

  //ytAnalytics = google.youtubeAnalytics({
 //   version: 'v1',
 //   auth: accessToken,
 // });

   getUserChannel();
}

async function getUserChannel(){
     const response = await youtubeClient.channels.list({
      mine: true,
      part: 'id,contentDetails',
    });
      // if ('error' in response) {
       //  console.error(response.error.message)
      // }  else {


     console.log(response);

         //channelId = response.items[0].id
        // var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
        // getPlaylistItems(uploadsListId);
   }
/*request.execute(function(response){
    if ('error' in response){
      //display a toast eventually, but for now, just output to console
      console.error(response.error.message);
    } else {
      channelId = response.items[0].id;

      var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
      getPlaylistItems(uploadsListId);
    }
    }}
}*/

function getPlaylistItems(listId) {
  // See https://developers.google.com/youtube/v3/docs/playlistitems/list
    var request = youtubeClient.playlistItems.list({
      playlistId: listId,
      part: 'snippet'
    });

    request.execute(function(response) {
      if ('error' in response) {
        console.error(response.error.message);
      } else {
        if ('items' in response) {
          // The jQuery.map() function iterates through all of the items in
          // the response and creates a new array that only contains the
          // specific property we're looking for: videoId.
          var videoIds = $.map(response.items, function(item) {
            return item.snippet.resourceId.videoId;
          });

          // Now that we know the IDs of all the videos in the uploads list,
          // we can retrieve information about each video.
          getVideoMetadata(videoIds);
        } else {
          console.log('There are no videos in your channel.');
        }
      }
    });
}

function getVideoMetadata(videoIds) {
    // https://developers.google.com/youtube/v3/docs/videos/list
  var request = youtubeClient.videos.list({
      // The 'id' property's value is a comma-separated string of video IDs.
      id: videoIds.join(','),
      part: 'id,snippet,statistics'
    });

    request.execute(function(response) {
      if ('error' in response) {
        console.error(response.error.message);
      } else {
        // Get the jQuery wrapper for the #video-list element before starting
        // the loop.
        var videoList = $('#video-list');
        $.each(response.items, function() {
          // Exclude videos that do not have any views, since those videos
          // will not have any interesting viewcount Analytics data.
          if (this.statistics.viewCount == 0) {
            return;
          }

          var title = this.snippet.title;
          var videoId = this.id;

          // Create a new &lt;li&gt; element that contains an &lt;a&gt; element.
          // Set the &lt;a&gt; element's text content to the video's title, and
          // add a click handler that will display Analytics data when invoked.
          var liElement = $('<li>');
          var aElement = $('<a>');
          // Setting the href value to '#' ensures that the browser renders the
          // &lt;a&gt; element as a clickable link.
          aElement.attr('href', '#');
          aElement.text(title);
          aElement.click(function() {
            getVideoAnalytics(videoId);
          });

          // Call the jQuery.append() method to add the new &lt;a&gt; element to
          // the &lt;li&gt; element, and the &lt;li&gt; element to the parent
          // list, which is identified by the 'videoList' variable.
          liElement.append(aElement);
          videoList.append(liElement);
        });

        if (videoList.children().length == 0) {
          // Display a message if the channel does not have any viewed videos.
          console.log('Your channel does not have any videos that have been viewed.');
        }
      }
    });
  }

function getYoutubeAnalytics(){
  var today = new Date();
      var lastMonth = new Date(today.getTime() - ONE_MONTH_IN_MILLISECONDS);

      var request = ytAnalytics.reports.query({
        // The start-date and end-date parameters must be YYYY-MM-DD strings.
        'start-date': formatDateString(lastMonth),
        'end-date': formatDateString(today),
        // At this time, you need to explicitly specify channel==channelId.
        // See https://developers.google.com/youtube/analytics/v1/#ids
        ids: 'channel==' + channelId,
        dimensions: 'day',
        sort: 'day',
        // See https://developers.google.com/youtube/analytics/v1/available_reports
        // for details about the different filters and metrics you can request
        // if the "dimensions" parameter value is "day".
        metrics: 'views',
        filters: 'video==' + videoId
      });

      request.execute(function(response) {
        // This function is called regardless of whether the request succeeds.
        // The response contains YouTube Analytics data or an error message.
        if ('error' in response) {
          console.error(response.error.message);
        } else {
          console.log(videoId);
          console.log(response);
          //console.log(videoId, response);
        }
      });
}

  // This boilerplate code takes a Date object and returns a YYYY-MM-DD string.
  function formatDateString(date) {
    var yyyy = date.getFullYear().toString();
    var mm = padToTwoCharacters(date.getMonth() + 1);
    var dd = padToTwoCharacters(date.getDate());

    return yyyy + '-' + mm + '-' + dd;
  }

  // If number is a single digit, prepend a '0'. Otherwise, return the number
  //  as a string.
  function padToTwoCharacters(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number.toString();
    }
  }


module.exports = router;
