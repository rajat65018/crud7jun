const AWS = require("aws-sdk");
const { SECRETACCESSKEY, ACCESSKEY, BUCKETNAME } = require("../../config");

const s3 = new AWS.S3({
  accessKeyId: ACCESSKEY,
  secretAccessKey: SECRETACCESSKEY,
});

function uploadFileToS3(req) {
  const file = req.file;
  params = {
    Body: file.buffer,
    Bucket: BUCKETNAME,
    Key: file.originalname,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}
module.exports = uploadFileToS3;
