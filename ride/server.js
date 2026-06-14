import { createServer } from 'http';
import app from './app.js';
import connect from './config/db.js';
import { connectR } from './service/rabbit.js';
import { initRideQueue } from './controller/ride.queue.controller.js';

const PORT = process.env.PORT || 3003;

const startServer = async () => {

    try {

        await connect();

        await connectR();

        initRideQueue();

        const server = createServer(app);

        server.listen(PORT, () => {
            console.log(
                `Ride service is running on port ${PORT}`
            );
        });

    } catch (error) {

        console.error(
            'Ride Service Startup Failed:',
            error
        );

        process.exit(1);
    }

};

startServer();