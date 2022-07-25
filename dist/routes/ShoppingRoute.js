"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const shoppingRouter = express_1.default.Router();
exports.ShoppingRoute = shoppingRouter;
// Food Availability
shoppingRouter.get('/:pincode', controllers_1.GetFoodAvailability);
//Top restaurants
shoppingRouter.get('/top-restaurants/:pincode', controllers_1.GetTopRestaurants);
//Food Available in 30 mins
shoppingRouter.get('/food-in-30-min/:pincode', controllers_1.GetFoodIn30Min);
//Search Foods
shoppingRouter.get('/search/:pincode', controllers_1.SearchFoods);
//Find Restaurant By Id
shoppingRouter.get('/restaurant/:id', controllers_1.RestaurantById);
//# sourceMappingURL=ShoppingRoute.js.map