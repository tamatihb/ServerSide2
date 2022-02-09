const express = require('express'); 
const router = express.Router();

const RestaurantPolicy = require('../policies/restaurantPolicy')
const restaurantController = require('../controller/restaurantController')



module.exports = () => {

// GET
router.get("/", 
restaurantController.getRestaurant
);

router.post('/',
RestaurantPolicy.validateRestaurant,
restaurantController.postRestaurant
);

router.get("/:id",
restaurantController.getRestaurantById);

router.put('/:id',
RestaurantPolicy.validateRestaurant,
restaurantController.putRestaurantById
);

router.delete('/:id',
restaurantController.deleteRestaurantById
);

return router
}