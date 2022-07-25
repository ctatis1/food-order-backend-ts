"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const restaurantRouter = express_1.default.Router();
exports.RestaurantRoute = restaurantRouter;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
restaurantRouter.post('/login', controllers_1.RestaurantLogin);
restaurantRouter.use(middlewares_1.Authenticate);
restaurantRouter.get('/profile', controllers_1.GetRestaurantProfile);
restaurantRouter.patch('/profile', controllers_1.UpdateRestaurantProfile);
restaurantRouter.patch('/coverImage', images, controllers_1.UpdateRestaurantCoverImage);
restaurantRouter.patch('/services', controllers_1.UpdateRestaurantServices);
restaurantRouter.post('/food', images, controllers_1.AddFood);
restaurantRouter.get('/foods', controllers_1.GetFoods);
restaurantRouter.get('/', (req, res, next) => {
    res.json({ message: 'Hello from RestaurantRoute' });
});
//# sourceMappingURL=RestaurantRoute.js.map