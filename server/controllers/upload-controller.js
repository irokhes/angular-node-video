var User       = require('../models/user'),
   cloudinary  = require('cloudinary'),
   multiparty  = require('multiparty');
 

module.exports = {

  /**
     * Upload a video to Yourtube's Cloudinary Server
     * @param  req
     * @param  res
     * @return void
     */
    uploadVideo: function(req, res){
      var fileName = '';
      var size = '';
      var tempPath;
      var extension;
      var videoName;
      var destPath = '';
      var inputStream;
      var outputStream;
      var form = new multiparty.Form();

      form.on('error', function(err){
        console.log('Error parsing form: ' + err.stack);
      });
      form.on('part', function(part){
        if(!part.filename){
          return;
        }
        size = part.byteCount;
        fileName = part.filename;
      });
      form.on('file', function(name, file){
        cloudinary.uploader.upload_large(file.path, function(response){
          return res.json({ response: response });
        }, { resource_type: "video", chunk_size: 10000000 });
      });
      form.on('close', function(){
        console.log('Uploaded!!');
      });
      form.parse(req);
    },

    tagVideos: function(req, res) {
      var tag = req.body.tag;
      console.log(tag);
      var publicId = req.params.public_id;

      cloudinary.uploader.add_tag( tag, [ publicId ], function(response){
        console.log(response);
      }, { resource_type: "video" });
    },

    removeAudio: function(req, res) {
          var videoUrl = req.body.url;
          var publicId = req.params.public_id;
          var format = req.body.format;
          var response = videoUrl.split("upload")[0].concat("upload/ac_none/" + publicId + "." + format );
          return response;
    },

    changeBackground: function(req, res) {
          var videoUrl = req.body.url;
          var publicId = req.params.public_id;
          var format = req.body.format;
          var color = req.body.videoBackground || "yellow";
          var response = videoUrl.split("upload")[0].concat("upload/w_300,h_300,c_pad,b_" + color + "/" + publicId + "." + format );
          return response;
    }
};