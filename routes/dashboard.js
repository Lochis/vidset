var express = require('express');
var router = express.Router();
const formidable = require('formidable');

var ffmpeg = require('fluent-ffmpeg');
var inputFilePath;
var name;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        username: req.user?.displayName,
        isAuth: req.isAuthenticated(),
      });
});

router.post('/resize', async function(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: "public/images",
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024,
  });

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ files });
      });
    });

    let inputFilePath = files.video.filepath;
    console.log(files);
    const name = files.video.newFilename;
    console.log(name);
    const outputFilePath = "public/images/resized_" + name; // Define the output file path

    ffmpeg(inputFilePath)
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
 