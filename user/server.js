import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import { connectR } from './service/rabbit.js';

const server = http.createServer(app);

const startServer = async () => {
    try {
        await connectDB();
        await connectR();

        server.listen(3001, () => {
            console.log('User service running on port 3001');
        });

    } catch (error) {
    console.error('RabbitMQ Error:', error);
    throw error;
  }
};

startServer();