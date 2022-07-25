import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvailability, GetFoodIn30Min, GetTopRestaurants, RestaurantById, SearchFoods } from '../controllers';

const shoppingRouter = express.Router();

// Food Availability

shoppingRouter.get('/:pincode', GetFoodAvailability);

//Top restaurants

shoppingRouter.get('/top-restaurants/:pincode', GetTopRestaurants)

//Food Available in 30 mins

shoppingRouter.get('/food-in-30-min/:pincode', GetFoodIn30Min)

//Search Foods

shoppingRouter.get('/search/:pincode', SearchFoods);

//Find Restaurant By Id

shoppingRouter.get('/restaurant/:id', RestaurantById);

export { shoppingRouter as ShoppingRoute }