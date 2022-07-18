import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction} from 'express';
import { CustomerSignUpInputs, UserLoginInputs } from '../dto';
import { Customer } from '../models/Customer';
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utils';

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
    const userPassword = await GeneratePassword(password,salt);

    const existingCustomer = await Customer.findOne({ email: email});
    if(existingCustomer !==  null) {
        return res.json({ Message: "Customer already exists"});
    }

    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        firstname: '',
        lastname: '',
        address: '',
        verify: false,
        lat: 0,
        lon: 0
    })

    if(result){
        //Generate Signature
        const signature = GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verify
        })
        //Send result to client
        return res.status(200).json({ signature: signature, verify: result.verify, email: result.email});
    }

    return res.status(404).json({ Message: 'Error with the Signup' });

}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    const loginInputs = plainToClass( UserLoginInputs, req.body);

    const loginErrors = await validate(loginInputs, { validationError: { target: true } });
    if(loginErrors.length > 0) {
        return res.status(403).json(loginErrors);
    }

    const { email, password } = loginInputs;
    const customer = await Customer.findOne({ email: email });
    if(customer){
        const validation = await ValidatePassword(password, customer.password, customer.salt);
        if(validation){
            const signature = GenerateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verify
            })
            //Send result to client
            return res.status(200).json({ signature: signature, verify: customer.verify, email: customer.email});
        }
    }
    return res.status(404).json({ Message: 'Error with the Login' });
}

export const CustomerVerify =async (req: Request, res: Response, next: NextFunction) => {

}


export const GetCustomerProfile =async (req: Request, res: Response, next: NextFunction) => {

}

export const EditCustomerProfile =async (req: Request, res: Response, next: NextFunction) => {

}

