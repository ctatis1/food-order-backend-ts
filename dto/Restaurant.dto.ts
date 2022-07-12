export interface CreateRestaurantInput{
    name: string,
    phone: string,
    email: string,
    ownername: string,
    password: string,
    foodType: [string],
    pincode: string,
    address: string,
}

export interface RestaurantLoginInput{
    email: string
    password: string
}

export interface RestaurantPayload{
    _id: string
    name: string,
    email: string,
    foodType: [string]
}

export interface EditRestaurantInputs{
    name: string,
    address: string,
    phone: string
    foodType: [string];
}