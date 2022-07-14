import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import express, { Request, Response, NextFunction} from 'express';
import { CustomerSignUpInputs } from '../dto/Customer.dto';
import { Customer } from '../models/Customer';
import { GenerateOtp, GeneratePassword, GenerateSalt } from '../utils';

export const CustomerSignUp =async (req: Request, res: Response, next: NextFunction) => {

    /* Converting the request body to a class instance. */
    const customerInputs = plainToClass(CustomerSignUpInputs, req.body)
    /* Validating the class instance against the validation decorators. */
    const inputErrors = await validate(customerInputs, { validationError: { target: true } })

    if(inputErrors.length >0){
        return res.status(400).json(inputErrors)
    }

    const {email, password, phone} = customerInputs

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password,salt)

    const { otp, expiry } = GenerateOtp();

    console.log(otp, expiry);
    return res.json('working...')
    

    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstname: '',
        lastname: '',
        address: '',
        verify: false,
        lat: 0,
        lon: 0
    })

    if(result){
        //send OTP to customer

        //Generate Signature

        //Send result to client
    }

}

export const CustomerLogin =async (req: Request, res: Response, next: NextFunction) => {

}

export const CustomerVerify =async (req: Request, res: Response, next: NextFunction) => {

}

export const RequestOtp =async (req: Request, res: Response, next: NextFunction) => {

}

export const GetCustomerProfile =async (req: Request, res: Response, next: NextFunction) => {

}

export const EditCustomerProfile =async (req: Request, res: Response, next: NextFunction) => {

}

