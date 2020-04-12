var express = require('express');
var multer = require('multer');
var path = require('path');
//var jwt = require('jsonwebtoken');
//var empModel = require('../modules/employee');
var uploadModel = require('../modules/upload');
var router = express.Router();
//var employee =empModel.find({});
var imageData = uploadModel.find({});
//router.use(express.static(__dirname + "./public/uploads"));
var app = express();
var port = 8009;
app.listen(port, function () {
  console.log('server running on port:' + port);
});
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: Storage
}).single('file');
/* GET home page. */




router.get('/upload', function (req, res, next) {
  imageData.exec(function (err, data) {
    if (err) throw err;
    res.render('upload-file', { title: 'Upload File', records: data, success: success });
  });
});
/* GET home page. */
router.post('/upload', upload, function (req, res, next) {
  var success = req.file.filename + " uploaded successfully";
  var imageFile = req.file.filename;
  var imageDetails = new uploadModel({
    imagename: imageFile
  });
  //uploaded in db
  imageDetails.save(function (err, doc) {
    if (err) throw err;
    imageData.exec(function (err, data) {
      if (err) throw err;
      res.render('upload-file', { title: 'Upload File', records: data, success: success });
    });
  });
});
module.exports = router;