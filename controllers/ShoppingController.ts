import express, { Request, Response, NextFunction } from 'express';
import { Restaurant } from '../models';
import { FoodDoc } from '../models/Food';

export const GetFoodAvailability =async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;

    const result = await Restaurant.find({ pincode: pincode, serviceAvailable: true }).sort('desc').populate('foods')

    if(result.length > 0){
        return res.status(200).json(result)
    }

    return res.status(400).json({ message: 'No Restaurants Found' })

}

export const GetTopRestaurants =async (req: Request, res: Response, next: NextFunction) => {

}

export const GetFoodIn30Min =async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;

    const result = await Restaurant.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

    if(result.length > 0){
        let foodResult: any = [];

        result.map(restaurant => {
            const foods = restaurant.foods as [FoodDoc]
            foodResult.push(...foods.filter(food => food.readyTime < 30))
        })

        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: 'No Restaurants Found' })

}

export const SearchFoods =async (req: Request, res: Response, next: NextFunction) => {

    const pincode = req.params.pincode;

    const result = await Restaurant.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

    if(result.length > 0){
        let foodResult: any = [];

        result.map(item => foodResult.push(...item.foods))

        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: 'No Restaurants Found' })

}

export const RestaurantById =async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id

    const result = await Restaurant.findById(id).populate('foods')

    if(result){
        return res.json(result)
    }

    return res.status(400).json({ message: 'No Restaurants Found' })

}

