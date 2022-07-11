import {Response, Request, NextFunction} from 'express'
import { CreateRestaurantInput } from '../dto'
import { Restaurant } from '../models'

export const CreateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const {name, phone, email, ownername, foodType, password, pincode, address} = <CreateRestaurantInput>req.body

    const createRestaurant = new Restaurant({
        name: name,
        phone: phone,
        email: email,
        ownername: ownername,
        foodType: foodType,
        password: password,
        pincode: pincode,
        address: address,
        salt: '',
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    })

    return res.json({ name, phone, email, ownername, foodType, password, pincode, address })
}
export const GetRestaurants =async (req: Request, res: Response, next: NextFunction) => {

}
export const GetRestaurantById =async (req: Request, res: Response, next: NextFunction) => {

}