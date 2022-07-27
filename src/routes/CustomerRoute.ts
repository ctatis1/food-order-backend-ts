import express from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, GetOrderById, GetAllOrders, CreateOrder } from '../controllers';
import { Authenticate } from '../middlewares';

const customerRouter = express.Router();

//Sign up / Create Account

customerRouter.post('/signup', CustomerSignUp)

//Login

customerRouter.post('/login', CustomerLogin)

//Authentication

customerRouter.use(Authenticate)

//Verify Account 

customerRouter.patch('/verify', CustomerVerify)

//Profile

customerRouter.get('/profile', GetCustomerProfile)
customerRouter.patch('/profile', EditCustomerProfile)

//Cart
//Order
customerRouter.get('/orders', GetAllOrders);
customerRouter.get('/order/:id', GetOrderById);
customerRouter.post('/create-order', CreateOrder);

//Payment

export { customerRouter as CustomerRoute }