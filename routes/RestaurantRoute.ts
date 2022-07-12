import express, { Request, Response, NextFunction } from 'express';
import { AddFood, GetFoods, GetRestaurantProfile, RestaurantLogin, UpdateRestaurantProfile, UpdateRestaurantServices } from '../controllers';
import { Authenticate } from '../middlewares';

const restaurantRouter = express.Router();

restaurantRouter.post('/login', RestaurantLogin)

restaurantRouter.use(Authenticate)

restaurantRouter.get('/profile', GetRestaurantProfile)
restaurantRouter.patch('/profile', UpdateRestaurantProfile)
restaurantRouter.patch('/services', UpdateRestaurantServices)

restaurantRouter.post('/food', AddFood)
restaurantRouter.get('/foods', GetFoods)

restaurantRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from RestaurantRoute' })
})

export { restaurantRouter as RestaurantRoute };