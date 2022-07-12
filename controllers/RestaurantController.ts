import {Request, Response, NextFunction} from 'express'
import { EditRestaurantInputs, RestaurantLoginInput } from '../dto'
import { CreateFoodInput } from '../dto/Food.dto'
import { Restaurant } from '../models'
import { Food } from '../models/Food'
import { GenerateSignature, ValidatePassword } from '../utils'
import { FindRestaurant } from './AdminControllers'

export const RestaurantLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <RestaurantLoginInput>req.body

    const existingRestaurant = await FindRestaurant('',email); 

    if(existingRestaurant !== null){
        const validation = await ValidatePassword(password, existingRestaurant.password, existingRestaurant.salt)
        
        if(validation){
            const signature = GenerateSignature({
                _id: existingRestaurant._id,
                name: existingRestaurant.name,
                email: existingRestaurant.email,
                foodType: existingRestaurant.foodType,
            })

            return res.json(signature)
        }else{
            return res.json({'Message': 'Password invalid' })
        }
    }

    return res.json({ "Message": "Login credentials are not correct" })

}

export const GetRestaurantProfile =async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user){
        const existingRestaurant = await FindRestaurant(user._id)
        return res.json(existingRestaurant)
    }
    return res.json({ "Message": "Login data not found" })

}

export const UpdateRestaurantProfile =async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, address, foodType } = <EditRestaurantInputs>req.body
    
    const user = req.user

    if(user){
        const existingRestaurant = await FindRestaurant(user._id)

        if(existingRestaurant !== null){
            existingRestaurant.name= name;
            existingRestaurant.phone = phone;
            existingRestaurant.address = address;
            existingRestaurant.foodType = foodType;

            const savedResult = await existingRestaurant.save()
            return res.json(savedResult);
        }

        return res.json(existingRestaurant)
    }
    return res.json({ "Message": "Login data not found" })
}

export const UpdateRestaurantServices =async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(user){
        const existingRestaurant = await FindRestaurant(user._id)

        if(existingRestaurant !== null){
            existingRestaurant.serviceAvailable = !existingRestaurant.serviceAvailable;
            
            const savedResult = await existingRestaurant.save()
            return res.json(savedResult);
        }

        return res.json(existingRestaurant)
    }
    return res.json({ "Message": "Login data not found" })
}

export const AddFood =async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(user){
        const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body

        const restaurant = await FindRestaurant(user._id)

        if(restaurant !== null){

            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename);

            const createFood = await Food.create({
                restaurantId: restaurant._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,   
                rating: 0,
                images: images

            })
            restaurant.foods.push(createFood);
            const result = await restaurant.save();

            res.json(result)
        }
    }
    return res.json({ "Message": "Something went wrong adding food" })
}

export const GetFoods =async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(user){
        const foods = await Food.find({ restaurantId: user._id })
        if(foods !== null){
            return res.json(foods)
        }
    }
    return res.json({ "Message": "There are no food found" })
}

