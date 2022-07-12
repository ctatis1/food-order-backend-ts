import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';    
import { AddFood, GetFoods, GetRestaurantProfile, RestaurantLogin, UpdateRestaurantProfile, UpdateRestaurantServices } from '../controllers';
import { Authenticate } from '../middlewares';

const restaurantRouter = express.Router();

const imageStorage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'images')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const images = multer({ storage: imageStorage}).array('images', 10);

restaurantRouter.post('/login', RestaurantLogin)

restaurantRouter.use(Authenticate)

restaurantRouter.get('/profile', GetRestaurantProfile)
restaurantRouter.patch('/profile', UpdateRestaurantProfile)
restaurantRouter.patch('/services', UpdateRestaurantServices)

restaurantRouter.post('/food', images, AddFood);
restaurantRouter.get('/foods', GetFoods)

restaurantRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Hello from RestaurantRoute' })
})

export { restaurantRouter as RestaurantRoute };