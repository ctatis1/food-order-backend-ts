"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const customerRouter = express_1.default.Router();
exports.CustomerRoute = customerRouter;
//Sign up / Create Account
customerRouter.post('/signup', controllers_1.CustomerSignUp);
//Login
customerRouter.post('/login', controllers_1.CustomerLogin);
//Authentication
customerRouter.use(middlewares_1.Authenticate);
//Verify Account 
customerRouter.patch('/verify', controllers_1.CustomerVerify);
//Profile
customerRouter.get('/profile', controllers_1.GetCustomerProfile);
customerRouter.patch('/profile', controllers_1.EditCustomerProfile);
//# sourceMappingURL=CustomerRoute.js.map