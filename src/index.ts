import './setup.js';
import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();

app.use(cors());
app.use(json());

app.get('/health', (_, res) => res.send('OK!'));
app.use(router);
app.use(errorHandler);

export default app;
