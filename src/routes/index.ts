import { Router } from 'express';
import { e2eTestsController } from '../controllers/e2eTestsController.js';
import customerRouter from './customerRouter.js';

const router = Router();

router.use('/customers', customerRouter);

if (process.env.NODE_ENV !== 'development') {
	router.use('/e2e/truncate', e2eTestsController.resetDB);
}

export default router;
