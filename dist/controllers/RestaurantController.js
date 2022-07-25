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
exports.GetFoods = exports.AddFood = exports.UpdateRestaurantServices = exports.UpdateRestaurantCoverImage = exports.UpdateRestaurantProfile = exports.GetRestaurantProfile = exports.RestaurantLogin = void 0;
const Food_1 = require("../models/Food");
const utils_1 = require("../utils");
const AdminControllers_1 = require("./AdminControllers");
const RestaurantLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingRestaurant = yield (0, AdminControllers_1.FindRestaurant)('', email);
    if (existingRestaurant !== null) {
        const validation = yield (0, utils_1.ValidatePassword)(password, existingRestaurant.password, existingRestaurant.salt);
        if (validation) {
            const signature = (0, utils_1.GenerateSignature)({
                _id: existingRestaurant._id,
                name: existingRestaurant.name,
                email: existingRestaurant.email,
                foodType: existingRestaurant.foodType,
            });
            return res.json(signature);
        }
        else {
            return res.json({ 'Message': 'Password invalid' });
        }
    }
    return res.json({ "Message": "Login credentials are not correct" });
});
exports.RestaurantLogin = RestaurantLogin;
const GetRestaurantProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingRestaurant = yield (0, AdminControllers_1.FindRestaurant)(user._id);
        return res.json(existingRestaurant);
    }
    return res.json({ "Message": "Login data not found" });
});
exports.GetRestaurantProfile = GetRestaurantProfile;
const UpdateRestaurantProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, address, foodType } = req.body;
    const user = req.user;
    if (user) {
        const existingRestaurant = yield (0, AdminControllers_1.FindRestaurant)(user._id);
        if (existingRestaurant !== null) {
            existingRestaurant.name = name;
            existingRestaurant.phone = phone;
            existingRestaurant.address = address;
            existingRestaurant.foodType = foodType;
            const savedResult = yield existingRestaurant.save();
            return res.json(savedResult);
        }
        return res.json(existingRestaurant);
    }
    return res.json({ "Message": "Login data not found" });
});
exports.UpdateRestaurantProfile = UpdateRestaurantProfile;
const UpdateRestaurantCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const restaurant = yield (0, AdminControllers_1.FindRestaurant)(user._id);
        if (restaurant !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            restaurant.coverImages.push(...images);
            const result = yield restaurant.save();
            res.json(result);
        }
    }
    return res.json({ "Message": "Something went wrong adding food" });
});
exports.UpdateRestaurantCoverImage = UpdateRestaurantCoverImage;
const UpdateRestaurantServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingRestaurant = yield (0, AdminControllers_1.FindRestaurant)(user._id);
        if (existingRestaurant !== null) {
            existingRestaurant.serviceAvailable = !existingRestaurant.serviceAvailable;
            const savedResult = yield existingRestaurant.save();
            return res.json(savedResult);
        }
        return res.json(existingRestaurant);
    }
    return res.json({ "Message": "Login data not found" });
});
exports.UpdateRestaurantServices = UpdateRestaurantServices;
const AddFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const restaurant = yield (0, AdminControllers_1.FindRestaurant)(user._id);
        if (restaurant !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            const createFood = yield Food_1.Food.create({
                restaurantId: restaurant._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                rating: 0,
                images: images
            });
            restaurant.foods.push(createFood);
            const result = yield restaurant.save();
            res.json(result);
        }
    }
    return res.json({ "Message": "Something went wrong adding food" });
});
exports.AddFood = AddFood;
const GetFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield Food_1.Food.find({ restaurantId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }
    return res.json({ "Message": "There are no food found" });
});
exports.GetFoods = GetFoods;
//# sourceMappingURL=RestaurantController.js.map