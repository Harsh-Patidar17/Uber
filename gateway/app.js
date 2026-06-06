import express from 'express';
import expressProxy from 'express-http-proxy';

const app = express();

app.use('/user', expressProxy('http://user-service:3001'));
app.use('/captain', expressProxy('http://captain-service:3002'));
app.use('/ride', expressProxy('http://ride-service:3003'));

app.listen(3000, () => {
    console.log('API Gateway is running on port 3000');
});

export default app;
