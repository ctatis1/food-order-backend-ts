import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {AdminRoute, RestaurantRoute} from './routes'
import { MONGODB_URI } from './config';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', AdminRoute);
app.use('/restaurant', RestaurantRoute);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('Connected to Mongodb')
    })
    .catch( error => 
        console.log('Message: ', error)
    )

app.listen(8000, () => {
    console.clear();
    console.log('App listening at port 8000')
})