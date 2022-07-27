import mongoose, { Schema, Document } from "mongoose";

export interface OrderDoc extends Document{
    orderId: string,
    items: [any],
    totalAmount: number,
    orderDate: Date,
    paidThrough: string,
    paymentResponse: string,
    status: string
}

const OrderSchema = new Schema({
    orderId: { type: String, required: true},
    items: [{
        food: { type: Schema.Types.ObjectId, ref: 'Food' , required: true},
        unit: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true},
    orderDate: { type: Date},
    paidThrough: { type: String},
    paymentResponse: { type: String},
    status: {type:String},
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

const Order = mongoose.model<OrderDoc>('Order', OrderSchema);

export { Order };