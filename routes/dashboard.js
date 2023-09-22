var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const { google } = require('googleapis');
const fs = require('fs');
const axios = require('axios');
const sessions = require('express-session');

var ffmpeg = require('fluent-ffmpeg');
var inputFilePath;
var name;
var youtubeClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user?.displayName);
  console.log(req.user.accessToken);
  if (req.isAuthenticated()){
   initYoutubeClient(req.user.accessToken);
  }
    res.render('dashboard', {
        username: req.user?.displayName,
        isAuth: req.isAuthenticated(),
      });
});

function initYoutubeClient(accessToken){
  youtubeClient = google.youtube({
    version: 'v3',
    auth: accessToken,
  });
}

router.post('/uploadShort', (req, res) => {
  const accessToken = req.user.accessToken;
  console.log("made it");
  const videoPath = req.body.videoPath; // path to the video
   //fs.readFile('public/images/resized_f8763cc8cf08eab3eb054fc00.mp4');//fs.readFile(videoPath); 
  
   // Prepare the request body with video metadata
   const requestBody = {
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: req.body.title, // Title of the video
          description: req.body.description, // Description of the video
          tags: 'lofi', // Tags for the video (comma-separated string)
          categoryId: 10, // ID of the video category   10 = music
        },
        status: {
          privacyStatus: 'public' // Privacy status of the video: 'public', 'private', or 'unlisted'
        }
      },
      media: {
        body: fs.createReadStream(videoPath), // The video file data
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }

  /*axios
  .post('https://www.googleapis.com/upload/youtube/v3/videos', requestBody, {
    headers: requestBody.headers,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  })
  .then((response) => {
    const videoId = response.data.id;
    console.log('Video uploaded successfully. Video ID:', videoId);
    res.status(200).send('Video uploaded successfully');
  })
  .catch((error) => {
    console.error('Error uploading video:', error);
    res.status(500).send('Error uploading video');
  });
});*/

  youtubeClient.videos.insert(requestBody, (err, response) => {
    if (err) {
      console.error('Error uploading video:', err);
      res.status(500).send('Error uploading video');
    } else {
      const videoId = response.data.id;
      console.log('Video uploaded successfully. Video ID:', videoId);
      res.status(200).send('Video uploaded successfully');
    }
  });
});


router.post('/resize', async function(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: "public/images",
    keepExtensions: true,
    maxFileSize: 100 * 2048 * 2048,
  });

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ files });
      });
    });

    let inputFilePath = files.video.filepath;
    //console.log(files);
    const name = files.video.newFilename;
    console.log(name);
    const outputFilePath = "public/images/resized_" + name; // Define the output file path

    
    ffmpeg(inputFilePath)
      .setStartTime('00:00:00')
      .setDuration('30')
      .outputOptions('-vf', 'crop=ih*9/16:ih')
      .output(outputFilePath)
      .on('end', () => {
        console.log('Video processing finished');
        // Send a response indicating successful video processing
        res.status(200).json({ 
          message: 'Video processing completed', 
          videoPath: 'images/resized_'+name, 
          videoWidth: 405, 
          videoHeight: 720});
      })
      .on('error', (err) => {
        console.error('Video processing error:', err);
        // Send an error response in case of any errors during video processing
        res.status(500).json({ error: 'An error occurred during video processing' });
      })
      .run();
  } catch (error) {
    console.error('Form parsing error:', error);
    res.status(500).json({ error: 'An error occurred while parsing the form' });
  }
});

/*router.post('/resize', async function(req, res) {
  
  const form = new formidable.IncomingForm({
    uploadDir: "public/images",
    keepExtensions: true,
  });
  
  
  form.parse(req, async (err, fields, files) => {
    inputFilePath = await files.video.path;
    name = await files.video.name;
  
    ffmpeg(inputFilePath+'/'+name)
      .outputOptions('-vf', 'scale=-1:720,setsar=1:1')
      .output(outputFilePath)
      .on('end', () => {
        console.log('Video processing finished');
        // Send a response indicating successful video processing
        res.status(200).json({ message: 'Video processing completed' });
      })
      .on('error', (err) => {
        console.error('Video processing error:', err);
        // Send an error response in case of any errors during video processing
        res.status(500).json({ error: 'An error occurred during video processing' });
      })
      .run();
    });

});*/


module.exports = router;
 