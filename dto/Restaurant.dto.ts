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