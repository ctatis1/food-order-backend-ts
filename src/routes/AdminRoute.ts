import express, { Request, Response, NextFunction } from 'express';
import { CreateRestaurant, GetRestaurantById, GetRestaurants } from '../controllers'

const adminRouter = express.Router();

adminRouter.post('/restaurant', CreateRestaurant)

adminRouter.get('/restaurant', GetRestaurants)

adminRouter.get('/restaurant/:id', GetRestaurantById)

adminRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from AdminRoute' })
})


export { adminRouter as AdminRoute };