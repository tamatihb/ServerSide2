//import express and router
    const express = require ("express");
    const router = express.Router();

// import custom controllers
    const restaurantController = require("../controller/restaurantController")



// creating routes within an export function
    module.exports = () => {

    router.get("/restaurant", 
        restaurantController.getRestaurant
    );

    router.post('/restaurant',
    restaurantController.postRestaurant
    );

    router.get("/restaurant/:id",
    restaurantController.getRestaurantById);

  router.put('/restaurant/:id',
    restaurantController.putRestaurantById
  );

  router.delete('/restaurant/:id',
    restaurantController.deleteRestaurantById
  );

return router
}