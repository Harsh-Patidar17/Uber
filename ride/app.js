import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';

import rideRoutes from './routes/ride.routes.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'ride-service',
        status: 'healthy'
    });
});

app.use('/', rideRoutes);

export default app;