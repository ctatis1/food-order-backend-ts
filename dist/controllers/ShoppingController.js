"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantById = exports.SearchFoods = exports.GetFoodIn30Min = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Restaurant.find({ pincode: pincode, serviceAvailable: true }).sort('desc').populate('foods');
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: 'No Restaurants Found' });
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetFoodIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Restaurant.find({ pincode: pincode, serviceAvailable: true }).populate('foods');
    if (result.length > 0) {
        let foodResult = [];
        result.map(restaurant => {
            const foods = restaurant.foods;
            foodResult.push(...foods.filter(food => food.readyTime < 30));
        });
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: 'No Restaurants Found' });
});
exports.GetFoodIn30Min = GetFoodIn30Min;
const SearchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Restaurant.find({ pincode: pincode, serviceAvailable: true }).populate('foods');
    if (result.length > 0) {
        let foodResult = [];
        result.map(item => foodResult.push(...item.foods));
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: 'No Restaurants Found' });
});
exports.SearchFoods = SearchFoods;
const RestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Restaurant.findById(id).populate('foods');
    if (result) {
        return res.json(result);
    }
    return res.status(400).json({ message: 'No Restaurants Found' });
});
exports.RestaurantById = RestaurantById;
//# sourceMappingURL=ShoppingController.js.map