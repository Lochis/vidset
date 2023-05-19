var express = require('express');
var router = express.Router();
const formidable = require('formidable');

var ffmpeg = require('fluent-ffmpeg');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        username: req.user?.displayName,
        isAuth: req.isAuthenticated(),
      });
});

router.get('/resize', function(req, res) {
  let inputFilePath;
  let outputFilePath = "public/images/hi.mp4";
  const form = new formidable.IncomingForm({
    uploadDir: "public/images",
    keepExtensions: true,
  });
  
  form.parse(req, async (err, fields, files) => {
    inputFilePath = files.video.filepath;
  });

  ffmpeg(inputFilePath)
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


module.exports = router;
 