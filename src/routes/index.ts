import { Router } from 'express';
import customerRouter from './customerRouter.js';

const router = Router();

router.use('/customers', customerRouter);

export default router;
