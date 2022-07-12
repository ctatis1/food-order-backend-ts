import express, { Request, Response, NextFunction } from 'express';
import { RestaurantLogin } from '../controllers';

const restaurantRouter = express.Router();

restaurantRouter.post('/login', RestaurantLogin)

restaurantRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from RestaurantRoute' })
})

export { restaurantRouter as RestaurantRoute };