import app from './app.js';

import connect from './config/db.js';

import { connectR } from './service/rabbit.js';
import { initCaptainQueue } from './controllers/captain.controller.js';

const PORT = 3002;

app.listen(PORT, async () => {

    console.log(
        `Captain service running on port ${PORT}`
    );

    

    await connectR();
    initCaptainQueue();
});