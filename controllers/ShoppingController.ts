import express, { Request, Response, NextFunction } from 'express';
import { Restaurant } from '../models';

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

}

export const SearchFoods =async (req: Request, res: Response, next: NextFunction) => {

}

export const RestaurantById =async (req: Request, res: Response, next: NextFunction) => {

}

