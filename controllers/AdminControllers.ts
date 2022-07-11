import {Response, Request, NextFunction} from 'express'
import { CreateRestaurantInput } from '../dto'

export const CreateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const {name, phone, email, ownername, foodType, password, pincode} = <CreateRestaurantInput>req.body

    return res.json({ name, phone, email, ownername, foodType, password, pincode })
}
export const GetRestaurants =async (req: Request, res: Response, next: NextFunction) => {

}
export const GetRestaurantById =async (req: Request, res: Response, next: NextFunction) => {

}