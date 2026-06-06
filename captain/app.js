import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';

import captainRoutes from './routes/captain.routes.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', captainRoutes);

export default app;