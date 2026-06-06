import app from './app.js';

import connectDB from './config/db.js';
import { connectR } from './service/rabbit.js';

import { initCaptainQueue } from './controllers/captain.controller.js';

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    try {

        await connectDB();

        await connectR();

        await initCaptainQueue();

        app.listen(PORT, () => {
            console.log(
                `Captain service running on port ${PORT}`
            );
        });

    } catch (error) {

        console.error(
            'Captain Service Startup Failed:',
            error
        );

        process.exit(1);
    }
};

startServer();