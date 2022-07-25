import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';

export default async () => {
    try {
        await mongoose.connect(MONGODB_URI).then(() =>console.log('Connected to Mongodb') )
    } catch (error) {
        console.log('Message: ', error)
    }
}
