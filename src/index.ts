import './setup.js';
import express, { json } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.get('/health', (_, res) => res.sendStatus(200));

export default app;
