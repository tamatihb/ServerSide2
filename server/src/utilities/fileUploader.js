// STORAGE BUCKET UTILITY SERVICES
// Import in modules
const { bucket } = require('../config/db');
const uuid = require('uuid');
const path = require ('path')
const fs = require('fs');

module.exports = {

  // upload to storage bucket
  fileServerUpload( file) {
    console.log(file)
    const fileName = Date.now() + '_' + file.name;
    console.log(`Unique FileName: ${fileName}`);


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

    // Delete the files from temporary server location after bucket upload (/public/uploads)
    fs.unlink(filePath, err => {
      if(err) {
        return({
          message: 'Error occurred in removing file from temporary local storage'
        });
      } else {
        console.log('File in temporary local storage deleted');
      }
    });
    return downloadUrl;
  },



  getFilePathFromUrl(downloadURL) {
    console.log(`DownloadURL from DB: ${downloadURL}`);

    // Slice off the base URL from downloadURL
    const baseURL = `https://firebasestorage.googleapis.com/v0/b/mynamejeff-65c62.appspot.com/o/`;
   
    let filePath = downloadURL.replace(baseURL, "");
    
    // Remove everything after the query string
    const indexOfEndPath = filePath.indexOf("?");
    filePath = filePath.substring(0, indexOfEndPath);
    
    // Return filepath to be deleted 
    console.log(`File in Bucket for Deletion: ${filePath}`);
    return filePath;
  },

  async deleteFileFromBucket(filePath) {
    // Determine File Location in Storage 
    const file = bucket.file(filePath);
    console.log(`from fileUploader: ${file}`)
    
    const fileChecker = await file.exists();
    if (fileChecker[0] === false) {
      // [TOGGLE]: Set custom option parameter to prevent error returning
      const options = {
        ignoreNotFound: false,
      };
      const data = await file.delete(options);
      console.log(`The file: ${filePath}, does not exist in Storage.  Please check server for inconsistent data handling & database queries.`);

      // Return API response to controller
      return data[0];

    } else {
      // Call standard delete request
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${filePath}`);
      return data[0];
    }
  },
 
  validateFile(file, maxSize) {
    console.log(file)
    console.log(maxSize)

    // Check for file exists 
    if(file === null) {
      return({
        message: 'No file uploaded'
      });
    }

    // Check if file size exceeds set size
    if(file.RestaurantImage.size > maxSize) {
      return({
        message: 'The file is too large'
      });
    }

    //  Restrict file types
    // ( Split the extension from file name & store
    let ext = file.RestaurantImage.name;
    ext = ext.split('.').pop();
    ext = ext.toLowerCase();
    console.log(ext);

    // Check for restrictions against declared variable strings
    if( !(ext == "png" || ext == "jpeg" || ext == "jpg" || ext == "gif" ) ) {
      return({
        message: `Please upload an accepted image file type`
      });
    }
  }



}