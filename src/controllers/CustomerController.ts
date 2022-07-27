import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction} from 'express';
import { CustomerSignUpInputs, EditCustomerProfileInputs, OrderInputs, UserLoginInputs } from '../dto';
import { Customer } from '../models/Customer';
import { Food } from '../models/Food';
import { Order } from '../models/Order';
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
        lon: 0,
        orders: []
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
    const customer = req.user

    if(customer){
        const profile = await Customer.findById(customer._id);
        if(profile){
            return res.status(200).json(profile);
        }

    }
}

export const EditCustomerProfile =async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);
    
    const profileError = await validate(profileInputs, { validationError: { target: false } })
    if(profileError.length > 0) {
        return res.status(403).json(profileError);
    }

    const {firstname, lastname, address } = profileInputs;
    if(customer){
        const profile = await Customer.findById(customer._id);
        if(profile){
            profile.firstname = firstname;
            profile.lastname = lastname;
            profile.address = address;
            
            const result = await profile.save();
            return res.status(200).json(result);
        }

    }
}

export const GetAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user

    if(customer){
        const profile = await Customer.findById(customer._id).populate('orders');
        if(profile){
            res.status(200).json(profile.orders);
        }
    }
}

export const GetOrderById = async (req: Request, res: Response, next: NextFunction) => {

}

export const CreateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user

    if(customer){
        const orderId = `${Math.floor(Math.random() * 89999)+1000}`;
        const profile = await Customer.findById(customer._id);
        const cart = <[OrderInputs]>req.body;

        let cartItems = Array();
        let netAmount = 0;

        const foods = await Food.find().where('_id').in(cart.map(item => item._id)).exec();

        foods.map(food => {
            cart.map(({_id, unit}) => {
                if(food._id == _id){
                    netAmount += (food.price * unit);
                    cartItems.push({food, unit});
                }
            })
        })

        if(cartItems){
            const currentOrder = await Order.create({
                orderId: orderId,
                items: cartItems,
                totalAmount: netAmount,
                orderDate: new Date(),
                paidThrough: 'COP',
                paymentResponse: '',
                orderStatus: 'Waiting'
            })

            if(currentOrder){
                profile?.orders.push(currentOrder);
                await profile?.save();

                return res.status(200).json(currentOrder);
            }
        }

    }
    return res.status(400).json({ Message: 'Error with Create Order' });
}

