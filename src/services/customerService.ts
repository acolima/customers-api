import {
	CreateCustomer,
	customerRepository,
} from '../repositories/customerRepository.js';
import { error } from '../utils/errorsUtils.js';

async function createCustomer(newCustomer: CreateCustomer) {
	await isNameAvailable(newCustomer.name);

	await customerRepository.create(newCustomer);
}

async function getCustomers() {
	const customers = await customerRepository.getAll();

	return customers;
}

async function updateCustomer(id: string, updateCustomer: CreateCustomer) {
	await doesCustomerExists(id);

	await customerRepository.update(id, updateCustomer);
}

async function deleteCustomer(id: string) {
	await doesCustomerExists(id);

	await customerRepository.deleteCustomer(id);
}

async function isNameAvailable(name: string) {
	const customer = await customerRepository.findByName(name);

	if (customer) {
		throw error.conflict('This name is already saved');
	}
}

async function doesCustomerExists(id: string) {
	const customer = await customerRepository.findById(id);

	if (!customer) {
		throw error.notFound('Customer not found');
	}

	return customer;
}

export const customerService = {
	createCustomer,
	deleteCustomer,
	getCustomers,
	updateCustomer,
};