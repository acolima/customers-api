import { Request, Response } from 'express';
import { customerService } from '../services/customerService.js';

async function createCustomer(req: Request, res: Response) {
	const customer = req.body;

	await customerService.createCustomer(customer);

	res.sendStatus(201);
}

async function getCustomers(req: Request, res: Response) {
	const customers = await customerService.getCustomers();

	res.send(customers);
}

async function updateCustomer(req: Request, res: Response) {
	const { id } = req.params;
	const customer = req.body;

	await customerService.updateCustomer(id, customer);

	res.sendStatus(200);
}

async function deleteCustomer(req: Request, res: Response) {
	const { id } = req.params;

	await customerService.deleteCustomer(id);

	res.sendStatus(200);
}

export const customerController = {
	createCustomer,
	deleteCustomer,
	getCustomers,
	updateCustomer,
};
