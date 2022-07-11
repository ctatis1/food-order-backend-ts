import express from 'express';
import bodyParser from 'body-parser';
import {AdminRoute, RestaurantRoute} from './routes'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', AdminRoute);
app.use('/restaurant', RestaurantRoute);

app.listen(8000, () => (
    console.log('App listening at port 8000')
))