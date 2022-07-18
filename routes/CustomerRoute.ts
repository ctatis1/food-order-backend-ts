import express from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile } from '../controllers';

const customerRouter = express.Router();

//Sign up / Create Account

customerRouter.post('/signup', CustomerSignUp)

//Login

customerRouter.post('/login', CustomerLogin)

//Authentication

customerRouter.get('/authentication')

//Verify Account 

customerRouter.patch('/verify', CustomerVerify)

//Profile

customerRouter.get('/profile', GetCustomerProfile)
customerRouter.patch('/profile', EditCustomerProfile)

//Cart
//Order

//Payment

export { customerRouter as CustomerRoute }