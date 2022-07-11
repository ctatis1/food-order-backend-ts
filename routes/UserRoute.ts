import express, { Request, Response, NextFunction } from 'express';

const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from UserRoute' })
})

export { userRouter as UserRoute };