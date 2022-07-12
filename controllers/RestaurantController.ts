import {Request, Response, NextFunction} from 'express'
import { RestaurantLoginInput } from '../dto'
import { Restaurant } from '../models'
import { ValidatePassword } from '../utils'
import { FindRestaurant } from './AdminControllers'

export const RestaurantLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <RestaurantLoginInput>req.body

    const existingRestaurant = await FindRestaurant('',email); 

    if(existingRestaurant !== null){
        const validation = await ValidatePassword(password, existingRestaurant.password, existingRestaurant.salt)
        
        if(validation){
            return res.json(existingRestaurant)
        }else{
            return res.json({'Message': 'Password invalid' })
        }
    }

    return res.json({ "Message": "Login credentials are not correct" })

}

