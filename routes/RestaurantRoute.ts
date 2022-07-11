import express, { Request, Response, NextFunction } from 'express';

const restaurantRouter = express.Router();

restaurantRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from RestaurantRoute' })
})

export { restaurantRouter as RestaurantRoute };