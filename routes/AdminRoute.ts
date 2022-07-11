import express, { Request, Response, NextFunction } from 'express';
import { CreateUser } from '../controllers';

const adminRouter = express.Router();

adminRouter.post('/vandor', CreateUser)

adminRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from AdminRoute' })
})


export { adminRouter as AdminRoute };