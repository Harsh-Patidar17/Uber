import dotenv from 'dotenv';
dotenv.config();

import { publishToQueue, connectR } from './service/rabbit.js';

async function main() {
    await connectR();
    console.log("Publishing test message...");
    await publishToQueue("new-ride", JSON.stringify({ test: "Hello from local test script!" }));
    console.log("Published successfully!");
    process.exit(0);
}

main().catch(console.error);
