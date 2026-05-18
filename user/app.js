import express from 'express';
import userRoutes from './routes/user.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use('/', userRoutes);


export default app;