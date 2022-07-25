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
exports.GetRestaurantById = exports.GetRestaurants = exports.CreateRestaurant = exports.FindRestaurant = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const FindRestaurant = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield models_1.Restaurant.findOne({ email: email });
    }
    else {
        return yield models_1.Restaurant.findById(id);
    }
});
exports.FindRestaurant = FindRestaurant;
const CreateRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, ownername, foodType, password, pincode, address } = req.body;
    const existingRestaurant = yield (0, exports.FindRestaurant)('', email);
    if (existingRestaurant !== null) {
        return res.json({ "Message": "There is already a Restaurant with this email" });
    }
    const salt = yield (0, utils_1.GenerateSalt)();
    const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
    const createRestaurant = yield models_1.Restaurant.create({
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
        coverImages: [],
        foods: []
    });
    return res.json(createRestaurant);
});
exports.CreateRestaurant = CreateRestaurant;
const GetRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield models_1.Restaurant.find({});
    if (restaurants !== null) {
        return res.json(restaurants);
    }
    return res.json({ "Message": "There are no Restaurants available" });
});
exports.GetRestaurants = GetRestaurants;
const GetRestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantID = req.params.id;
    const restaurant = yield (0, exports.FindRestaurant)(restaurantID);
    if (restaurant !== null) {
        return res.json(restaurant);
    }
    return res.json({ "Message": "There are no Restaurant with this ID" });
});
exports.GetRestaurantById = GetRestaurantById;
//# sourceMappingURL=AdminControllers.js.map