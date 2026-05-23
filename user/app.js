import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import userRoutes from './routes/user.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { connectR } from './service/rabbit.js';

const app = express();

connectDB();
connectR();

app.use(cookieParser());
app.use(express.json());
app.use('/', userRoutes);


export default app;