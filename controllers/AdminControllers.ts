import {Response, Request, NextFunction} from 'express'
import { CreateRestaurantInput } from '../dto'
import { Restaurant } from '../models'
import { GenerateSalt, GeneratePassword } from '../utils'

export const CreateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const {name, phone, email, ownername, foodType, password, pincode, address} = <CreateRestaurantInput>req.body

    const existingRestaurant = await Restaurant.findOne({ email: email })
    if(existingRestaurant !== null){
        return res.json({ "Message": "There is already a Restaurant with this email" })
    }

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createRestaurant = await Restaurant.create({
        name: name,
        phone: phone,
        email: email,
        ownername: ownername,
        foodType: foodType,
        password: userPassword,
        pincode: pincode,
        address: address,
        salt: salt,
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    })

    return res.json(createRestaurant)
}

export const GetRestaurants =async (req: Request, res: Response, next: NextFunction) => {
    const restaurants = await Restaurant.find({})
    
    if(restaurants !== null){
        return res.json(restaurants)
    }

    return res.json({ "Message": "There are no Restaurants available" })
}

export const GetRestaurantById =async (req: Request, res: Response, next: NextFunction) => {
    const restaurant = await Restaurant.findById(req.params.id)

    return res.json(restaurant);
}