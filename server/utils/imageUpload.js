const mongoose = require("mongoose")
const multer = require("multer");
const {
  GridFsStorage
} = require("multer-gridfs-storage");

var bucket
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "images"
  });
  console.log(bucket);
})

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = Date.now() + file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "images"
        };
        resolve(fileInfo);
      });
    }
  });

const getImages =  (req, res) => {
  const file = bucket
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404)
          .json({
            err: "no files exist"
          });
      }
    }).then(f => {
      console.log(bucket.openDownloadStreamByName(req.params.filename).buffer)
      bucket.openDownloadStreamByName(req.params.filename).pipe(res);
      console.log(f)
    })
    console.log(file);
};
exports.upload = multer({
  storage
})
exports.getImages = getImages