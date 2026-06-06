import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('User service is up and running smoothly!');
});

app.use('/', userRoutes);

export default app;