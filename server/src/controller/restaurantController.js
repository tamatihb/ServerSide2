// Import modules
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { fileServerUpload, storageBucketUpload,validateFile, getFilePathFromUrl, deleteFileFromBucket } = require('../utilities/fileUploader');

module.exports = {

//! Get Restaurant and sort key.
  async getRestaurant(req, res, next){
    try {
// Store the Restaurant document in variable & call GET method
      const RestaurantRef = db.collection('Restaurant');

//? index fields
// 0. 
      const snapshot = await RestaurantRef.orderBy("RestaurantName", "desc").limit(10).get();


// 1.
// const snapshot = await RestaurantRef.where("RestaurantCategory", "==", "Buffet").orderBy("RestaurantName", "desc").limit(10).get();

//! 400 ERROR.
      if (snapshot.empty) {
        console.log(snapshot)
        return next(ApiError.badRequest('This Restaurant does not exist'));

// If success pushes Restaurant objects to array and sends up to client.
      } else {
        let docs = [];
        snapshot.forEach(doc => {
          docs.push({
            id: doc.id,
            RestaurantName: doc.data().RestaurantName,
            RestaurantCategory: doc.data().RestaurantCategory,
            RestaurantCuisine: doc.data().RestaurantCuisine,
            RestaurantRating: doc.data().RestaurantRating,
            RestaurantImage: doc.data().RestaurantImage
          });
        });
        res.send(docs);
      }


//! 500 ERROR Checks for Errors with the route or db.
    } catch(err) {
      return next(ApiError.internal('Your Restaurant cant be reached at this time.', err));
    }
  },




// POST Restaurant <--
  async postRestaurant(req, res, next){
    console.log(req.body, req.files)
    
//  File Validation work on fileUpload 
  err = validateFile( req.files, 5000000 );
  if(err){
    console.log(err)
    return next(ApiError.badRequest(`Your image does not meet requirements - ${ err.message }`)); 
  }
//? Save Image URL to Storage Bucket
// File upload
    let downloadUrl = null;
    try {
// server Upload
      const fileName = fileServerUpload(req.files.RestaurantImage)
// Storage Upload
      downloadUrl = await storageBucketUpload(fileName);
    } catch(err) {
      return next(ApiError.internal('Internal Server Error: An error occurred in uploading the image to storage', err));
    }
    try{
//! Storing the Restaurant document query in variable 
      const RestaurantRef = db.collection('Restaurant');
      const response = await RestaurantRef.add({
        RestaurantName: req.body.RestaurantName,
        RestaurantCategory: req.body.RestaurantCategory,
        RestaurantCuisine: req.body.RestaurantCuisine,
        RestaurantRating: Number(req.body.RestaurantRating),
        RestaurantImage: downloadUrl
      });
      console.log('Added Restaurant with ID:', response.id);
      res.send(response.id);

//!! 500 ERROR Checks for Errors in the route or db.
    } catch(err) {
      return next(ApiError.internal('Internal Server Error: Your Restaurant request cant be complete.', err));
    }
  },





// GET Restaurant BY ID <--
  async getRestaurantById(req, res, next){
    try {
      const RestaurantRef = db.collection('Restaurant').doc(req.params.id);
      const doc = await RestaurantRef.get();

//!! 400 ERROR
      if (!doc.exists) {
        return next(ApiError.badRequest('The Restaurant item you were looking for does not exist.'));
      } else {
        res.send(doc.data());
      }
    } catch(err) {
      return next(ApiError.internal('Your Restaurant request could not be processed at this time', err));
    }
  },

// PUT Restaurant BY ID <--
  async putRestaurantById(req, res, next){
    try {
//Validation (JOI) Direct from Form (refactored)
console.log(req.files);

// Authorisation

// File Upload
let downloadURL = null;
// IMAGE CHANGED: If the image is updated, a new file will be saved under req.files
if (req.files){
  // File Validation
  err = validateFile( req.files, 5000000 );
  if(err){
    console.log(err)
    return next(ApiError.badRequest(`Your image does not meet requirements - ${ err.message }`)); 
  }

  // File Upload
  try {      
    // Server-Upload
    console.log(`Updating image in database`);
    const fileName = fileServerUpload(req.files.RestaurantImage);

    // Storage-Upload
    downloadURL = await storageBucketUpload(fileName);

    // Delete OLD image version in Storage Bucket, if it exists
    if (req.body.filePath) {
      console.log(`Deleting old image in storage: ${req.body.filePath}...`);
      const bucketResponse = await deleteFileFromBucket(req.body.filePath);
    }

  } catch(err) {
    return next(ApiError.internal('Internal Server Error: An error occurred in uploading the new image to storage', err));
  }

// The image wont be changed, gets passed back into the current downloadURL then into the database unchanged.
} else {
  console.log(`No change to the image in database`);
  downloadURL = req.body.RestaurantImage;
}
// Store the Restaurant document query in variable & call UPDATE method for ID
      const RestaurantRef = db.collection('Restaurant').doc(req.params.id);
      const response = await RestaurantRef.update({
        RestaurantCategory:req.body.RestaurantCategory,
        RestaurantName: req.body.RestaurantName,
        RestaurantRating: req.body.RestaurantRating,
        RestaurantCuisine: req.body.RestaurantCuisine,
        RestaurantImage: downloadURL
      });
      res.send(response);

// 500 ERROR Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your Restaurant request could not be processed at this time', err));
    }
  },






//_ DELETE Restaurant BY ID
  async deleteRestaurantById(req, res, next){
    try {
// Store the Restaurant document query in variable & call DELETE method for ID (with PRECONDITION parameter to check document exists)
      const RestaurantRef = db.collection('Restaurant').doc(req.params.id);
      const doc = await RestaurantRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(ApiError.badRequest('The Restaurant item you were looking for does not exist'));
      } 

      const downloadURL = doc.data().RestaurantImage;
      const filePath = getFilePathFromUrl(downloadURL);
      console.log(filePath)

      //Call storage bucket delete function & delete specified filepath
      const bucketResponse = await deleteFileFromBucket(filePath);

      // (b) Delete document from Cloud Firestore
      if (bucketResponse) {
      const response = await RestaurantRef.delete({exists:true});
      res.send(response);
      console.log(res)
      }

      //!TESTING TO BE DONE 
  //  const response = await RestaurantRef.delete({exists:true});
  //      res.json({data:response ,message:"From restaurant cotroller"});
      

    } catch(err) {
      return next(ApiError.internal('Your Restaurant request could not be processed at this time', err));
    }
  }
}