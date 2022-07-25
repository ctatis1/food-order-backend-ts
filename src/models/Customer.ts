import mongoose, { Schema, Document, Model } from "mongoose";

interface CustomerDoc extends Document{
    email: string,
    phone: string,
    password: string,
    salt: string,
    firstname: string,
    lastname: string,
    address: string,
    verify: boolean,
    //latitud y longitud
    lat: number,
    lng: number
}

const CustomerSchema = new Schema({
    email: { type: String, required: true},
    phone: { type: String, required: true},
    password: { type: String, required: true},
    salt: { type: String, required: true},
    firstname: { type: String},
    lastname: { type: String },
    address: { type: String },
    verify: { type: Boolean, required: true},
    lat: { type: Number},
    lng: { type: Number}
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
/* A type guard. It is telling the compiler that the type of the model is `CustomerDoc`. */
const Customer = mongoose.model<CustomerDoc>('Customer', CustomerSchema);

export { Customer }