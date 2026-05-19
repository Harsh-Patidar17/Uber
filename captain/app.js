import express from 'express';
import captainRoutes from './routes/captain.routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config();
const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use('/', captainRoutes);


export default app;