import {Request, Response, NextFunction} from 'express'
import { EditRestaurantInputs, RestaurantLoginInput } from '../dto'
import { Restaurant } from '../models'
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

