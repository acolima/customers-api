import {
	CreateCustomer,
	customerRepository,
} from '../repositories/customerRepository.js';
import { error } from '../utils/errorsUtils.js';

async function createCustomer(newCustomer: CreateCustomer) {
	const customer = await customerRepository.findByName(newCustomer.name);

	if (customer) {
		throw error.conflict('This name is already saved');
	}

	await customerRepository.create(newCustomer);
}

async function getCustomers() {
	const customers = await customerRepository.getAll();

	return customers;
}

async function updateCustomer(id: string, updateCustomer: CreateCustomer) {
	const customer = await customerRepository.findById(id);

	if (!customer) {
		throw error.notFound('Customer not found');
	}

	await customerRepository.update(id, updateCustomer);
}

async function deleteCustomer(id: string) {
	const customer = await customerRepository.findById(id);

	if (!customer) {
		throw error.notFound('Customer not found');
	}

	await customerRepository.deleteCustomer(id);
}

export const customerService = {
	createCustomer,
	deleteCustomer,
	getCustomers,
	updateCustomer,
};
