import express, { Request, Response, NextFunction } from 'express';
import { GetRestaurantProfile, RestaurantLogin, UpdateRestaurantProfile, UpdateRestaurantServices } from '../controllers';
import { Authenticate } from '../middlewares';

const restaurantRouter = express.Router();

restaurantRouter.post('/login', RestaurantLogin)

restaurantRouter.get('/profile', Authenticate , GetRestaurantProfile)
restaurantRouter.patch('/profile', UpdateRestaurantProfile)
restaurantRouter.patch('/services', UpdateRestaurantServices)

restaurantRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from RestaurantRoute' })
})

export { restaurantRouter as RestaurantRoute };