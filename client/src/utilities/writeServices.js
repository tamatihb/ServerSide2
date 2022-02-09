module.exports = {
    // [1] Form Config to Format Mixed Form Data
    prepareFormData(data, filePath){
      // New instance of class
      let formData = new FormData();
    
      formData.append('RestaurantCategory', data.RestaurantCategory);
      formData.append('RestaurantCuisine', data.RestaurantCuisine);
      formData.append('RestaurantImage', data.RestaurantImage);
      formData.append('RestaurantName', data.RestaurantName);
      formData.append('RestaurantRating', data.RestaurantRating);
      if (filePath) {
        formData.append('filePath', filePath);
      }
      
      // Return object
      return formData;
    },
  
    //  Create file name from URL in Data Base
    getFilePathFromUrl(downloadURL) {
      // Slice off the base URL from downloadURL
      const baseURL = `https://firebasestorage.googleapis.com/v0/b/mynamejeff-65c62.appspot.com/o/`;
      let fileName = downloadURL.replace(baseURL, "");
      
      // Remove everything after the query string
      const indexOfEndPath = fileName.indexOf("?");
      fileName = fileName.substring(0, indexOfEndPath);
      
      // Return filepath to be deleted 
      console.log(`File Name: ${fileName}`);
      return fileName;
    }
  }