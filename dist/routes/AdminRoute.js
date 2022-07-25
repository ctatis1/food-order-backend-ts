"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const adminRouter = express_1.default.Router();
exports.AdminRoute = adminRouter;
adminRouter.post('/restaurant', controllers_1.CreateRestaurant);
adminRouter.get('/restaurant', controllers_1.GetRestaurants);
adminRouter.get('/restaurant/:id', controllers_1.GetRestaurantById);
adminRouter.get('/', (req, res, next) => {
    res.json({ message: 'Hello from AdminRoute' });
});
//# sourceMappingURL=AdminRoute.js.map