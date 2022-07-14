import express from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOtp } from '../controllers';

const customerRouter = express.Router();

//Sign up / Create Account

customerRouter.post('/signup', CustomerSignUp)

//Login

customerRouter.post('/login', CustomerLogin)

//Authentication

customerRouter.get('/authentication')

//Verify Account 

customerRouter.patch('/verify', CustomerVerify)

//OTP 

customerRouter.get('/otp', RequestOtp)

//Profile

customerRouter.get('/profile', GetCustomerProfile)
customerRouter.patch('/profile', EditCustomerProfile)

//Cart
//Order

//Payment

export { customerRouter as CustomerRoute }