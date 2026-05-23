import amqplib from 'amqplib';

let connection, channel;

async function connectR() {

    try {

        const rabbitUrl = process.env.RABBIT_URL;

        console.log('Rabbit URL:', rabbitUrl);

        connection = await amqplib.connect(rabbitUrl);

        channel = await connection.createChannel();

        console.log('Connected to RabbitMQ');

    } catch (error) {

        console.log('RabbitMQ Error:', error);
    }
}

async function subscribeToQueue(
    queueName,
    callback
) {
    console.log(' [RabbitMQ] subscribeToQueue called for queue:', queueName);

    if (!channel)
        await connectR();

    if (!channel) {
        console.log(
            'RabbitMQ channel unavailable'
        );
        return;
    }

    await channel.assertQueue(queueName);
    console.log(' [RabbitMQ] Successfully asserted queue:', queueName);

    channel.consume(
        queueName,
        (message) => {
            console.log(' [RabbitMQ] Received message content from queue:', queueName);
            callback(
                message.content.toString()
            );

            channel.ack(message);
        }
    );
}

async function publishToQueue(
    queueName,
    data
) {

    if (!channel)
        await connectR();

    if (!channel) {
        console.log(
            'RabbitMQ channel unavailable'
        );
        return;
    }

    await channel.assertQueue(queueName);

    channel.sendToQueue(
        queueName,
        Buffer.from(data)
    );
}
export {
    subscribeToQueue,
    publishToQueue,
    connectR
};