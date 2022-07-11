import express, { Request, Response, NextFunction } from 'express';
import { CreateRestaurant } from '../controllers';

const adminRouter = express.Router();

adminRouter.post('/restaurant', CreateRestaurant)

adminRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from AdminRoute' })
})


export { adminRouter as AdminRoute };