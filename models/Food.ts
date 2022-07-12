import mongoose, { Schema, Document } from "mongoose";

interface FoodDoc extends Document{
    restaurantId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string];
}

const foodSchema = new Schema({
    restaurantId: { type: String},
    name: { type: String, required: true},
    description: { type: String, required: true},
    category: { type: String},
    foodType: { type: String, required: true},
    readyTime: { type: Number },
    price: { type: Number, required: true},
    rating: { type:Number },
    images: { type: [String] }
},{
    toJSON: {
        transform(dot, ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
})

const Food = mongoose.model<FoodDoc>('Food', foodSchema);

export { Food };