import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: "http://localhost:5173" || process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use(cookieParser());
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({ extended: true, limit:'16kb' }));
app.get('/', (req, res) => {
    res.send('Welcome to the Auth Inkepto API');
});

// Your routes would go here

import { userRouter } from './src/routes/user.route.js';

app.use('/api', userRouter);

export {
    app,
}