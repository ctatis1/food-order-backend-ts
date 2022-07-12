import {Request, Response, NextFunction} from 'express'
import { RestaurantLoginInput } from '../dto'
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
    
}

export const UpdateRestaurantProfile =async (req: Request, res: Response, next: NextFunction) => {

}

export const UpdateRestaurantServices =async (req: Request, res: Response, next: NextFunction) => {

}

