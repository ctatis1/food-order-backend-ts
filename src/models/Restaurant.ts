import mongoose, { Schema, Document, Model } from "mongoose";

interface RestaurantDoc extends Document{
    name: string;
    phone: string;
    email: string;
    ownername: string;
    password: string;
    foodType: [string];
    pincode: string;
    address: string;
    foods: any;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
}

const RestaurantSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    ownername: { type: String, required: true },
    password: { type: String, required: true },
    foodType: { type: [String]},
    pincode: { type: String, required: true },
    address: { type: String },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }],
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, required: true },
    coverImages: { type: [String]},
    rating: {type: Number},
},{
    toJSON: {
        transform(doc, ret){
            delete ret.salt
            delete ret.password
            delete ret.createdAt
            delete ret.updatedAt
            delete ret.__v
        }
    },
    timestamps: true
})

/* Creating a model for the schema. */
/* A type guard. It is telling the compiler that the type of the model is `RestaurantDoc`. */
const Restaurant = mongoose.model<RestaurantDoc>('Restaurant', RestaurantSchema);

export { Restaurant }