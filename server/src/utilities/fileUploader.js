// STORAGE BUCKET UTILITY SERVICES
// Import in modules
const { bucket } = require('../config/db');
const uuid = require('uuid');
const path = require ('path')


module.exports = {

  // upload to storage bucket
  fileServerUpload() {
    console.log(file)

    
// Unique file name for firestore so the databse doesnt get confused with image uploads.
    const fileName = Date.now() + '_' + file.name;
    console.log(`unique FileName: ${fileName}`);


// server storage file path
    const filePath = path.join(
      __dirname,
      '../../',
      `/public/uploads/${fileName}`
    );

    file.mv(filePath);
    console.log(`Server Uploaded the file path: ${filePath}`)

    return fileName;

  },

  async storageBucketUpload(fileName) {
    console.log(`File name: ${fileName}`);
    const storageToken = uuid.v4();
    const filePath = `./public/uploads/${fileName}`;
    const destFileName = fileName;

    const options = {
      destination: destFileName,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken 
        },
      }
    };

    const result = await bucket.upload(filePath, options);
    const bucketName = result[0].metadata.bucket;
    console.log(`Bucket Name: ${bucketName}`);
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${destFileName}?alt=media&token=${storageToken}`;
    return downloadUrl;
  }
}