import { IsEmail, IsEmpty, Length } from 'class-validator'

export class CustomerSignUpInputs{
    
    @IsEmail()
    email: string;
    
    @Length(10)
    phone: string;
    
    @Length(6,12)
    password: string;
}

export class UserLoginInputs{
    @IsEmail()
    email: string;
    
    @Length(6,12)
    password: string;
}

export class EditCustomerProfileInputs{
    @Length(3,16)
    firstname: string;

    @Length(3,16)
    lastname: string;

    @Length(6,16)
    address: string;

}

export interface CustomerPayload{
    _id: string
    email: string
    verified: boolean
}
