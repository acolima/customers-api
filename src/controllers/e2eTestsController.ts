import { Request, Response } from 'express';
import { customerService } from '../services/customerService.js';

async function resetDB(req: Request, res: Response) {
	await customerService.resetDB();
	res.sendStatus(200);
}

export const e2eTestsController = {
	resetDB,
};
