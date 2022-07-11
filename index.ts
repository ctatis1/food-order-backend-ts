import express from 'express';
import {AdminRoute, UserRoute} from './routes'

const app = express();

app.use('/admin', AdminRoute);
app.use('/user', UserRoute);

app.listen(8000, () => (
    console.log('App listening at port 8000')
))