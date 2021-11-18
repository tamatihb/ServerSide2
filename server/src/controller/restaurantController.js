// Import modules
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { fileServerUpload, storageBucketUpload  } = require('../utilities/fileUploader');

module.exports = {
//! Get Restaurant and sort key.
  async getRestaurant(req, res, next){
    try {
// Store the Restaurant document in variable & call GET method
      const RestaurantRef = db.collection('Restaurant');

//? Sort keys.
// 0. 
      // const snapshot = await RestaurantRef.where("restaurantCuisine", "==", "italian")
      // .orderBy("RestaurantName", "desc").limit(10).get();

// 1. RestaurantName in Ascending Order
      // const snapshot = await RestaurantRef.where("RestaurantCategory", "asc").orderBy("RestaurantName", "asc").limit(10).get();

// 2.
      const snapshot = await RestaurantRef.get();
      
//? -- end sort key

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

//! POST Restaurant <--
  async postRestaurant(req, res, next){

    //? Save Image URL to Storage Bucket
    // File upload
    let downloadUrl = null;
    try {
// server Upload
      const fileName = fileServerUpload(req.files.RestaurantImage)


// Storage Upload
      downloadUrl = await storageBucketupload(fileName);
    } catch(err) {
      return next(ApiError.internal('Internal Server Error: An error occurred in uploading the image to storage', err));
    }

    try{
//! Storing the Restaurant document query in variable 
      const RestaurantRef = db.collection('Restaurant');
      const response = await RestaurantRef.add({
        RestaurantName: req.body.RestaurantName,
        RestaurantCategory: req.body.RestaurantCategory,
        RestaurantCuisine: req.body.RestaurantRating,
        RestaurantRating: req.body.RestaurantImage,
        RestaurantImage: downloadUrl
      });
      console.log('Added Restaurant with ID:', response.id);
      res.send(response.id);

//!! 500 ERROR Checks for Errors in the route or db.
    } catch(err) {
      return next(ApiError.internal('Internal Server Error: Your Restaurant request cant be complete.', err));
    }
  },

//! GET Restaurant BY ID <--
  async getRestaurantById(req, res, next){
    try {
      const RestaurantRef = db.collection('Restaurant').doc(req.params.RestaurantId);
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

//!! PUT Restaurant BY ID <--
  async putRestaurantById(req, res, next){
    try {
// Save form data to variables
      const RestaurantId = req.params.RestaurantId;
      const RestaurantName = req.body.RestaurantName;
      const RestaurantCuisine = req.body.RestaurantCuisine;
      const RestaurantRating = req.body.RestaurantRating;
// Save image data to variable for upload
      const RestaurantImage = req.body.RestaurantImage;
      console.log(RestaurantImage);


//!--------------
// Save Image URL to Storage Bucket
      let url = null;
      try {
        url = await storageBucketServices.uploadFile(RestaurantImage);
      } catch(err) {
        return next(ApiError.internal('Internal Server Error: An error occurred in uploading the image to storage', err));
      }

//! Store the Restaurant document query in variable & call UPDATE method for ID
      const RestaurantRef = db.collection('Restaurant').doc(RestaurantId);
      const response = await RestaurantRef.update({
        RestaurantName,
        RestaurantRating,
        RestaurantCuisine,
        RestaurantImage: url
      });
      res.send(response);

//!! 500 ERROR Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your Restaurant request could not be processed at this time', err));
    }
  },

//! DELETE Restaurant BY ID
  async deleteRestaurantById(req, res, next){
    try {
//! Store the Restaurant document query in variable & call DELETE method for ID (with PRECONDITION parameter to check document exists)
      const RestaurantRef = db.collection('Restaurant').doc(req.params.Id);
      const response = await RestaurantRef.delete({exists:true});
      res.send(response);
    } catch(err) {
      return next(ApiError.internal('Your Restaurant request could not be processed at this time', err));
    }
  }
}