const Joi = require ('joi')
const ApiError = require('../utilities/ApiError')

    module.exports = {
// post VAlidation
        validateRestaurant(req, res, next){

            console.log(req)


            const schema = Joi.object({
                RestaurantName:Joi.string().min(3).max(50).required(),
                RestaurantCategory:Joi.string().min(3).max(50).required(),
                RestaurantCuisine:Joi.string().min(3).max(50).required(),
                RestaurantRating:Joi.number().required(),
                RestaurantImage:Joi.string(),
                filePath:Joi.string()
            });

            // return one of two values based on this joi syntax
            const { error, value } = schema.validate(req.body);
            if (error){
                switch(error.details[0].context.key){
                    case 'RestaurantName':
                        next(ApiError.badRequest("Please input a valid Restaurant."))
                            break
                    
                    case 'RestaurantCategory':
                        next(ApiError.badRequest("Please input a valid Category."))
                            break

                    case 'RestaurantCuisine':
                        next(ApiError.badRequest("Please input a valid Cuisine."))
                             break
                             
                    case 'RestaurantRating':
                        next(ApiError.badRequest("Please input a valid Rating."))
                             break

                    case 'RestaurantImage':
                    case 'filePath':
                        next(ApiError.badRequest("Please input a valid Image."))
                             break
                    default:
                        next(ApiError.badRequest("invalid form Information - Please check form input and submit again."))

                }

            }else{
                next();
            }
           
        }

}