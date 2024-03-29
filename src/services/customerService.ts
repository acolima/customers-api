import {
	CreateCustomer,
	customerRepository,
} from '../repositories/customerRepository.js';
import { error } from '../utils/errorsUtils.js';

export interface SearchBy {
	id?: string;
	name?: string;
}

async function createCustomer(newCustomer: CreateCustomer) {
	for (const phone of newCustomer.phoneNumbers) {
		await isNumberSaved(phone.number);
	}

	await customerRepository.create(newCustomer);
}

async function getCustomers() {
	const customers = await customerRepository.getAll();

	return customers;
}

async function getCustomer(filter: SearchBy) {
	let customer = {};

	if (filter.id) customer = await customerRepository.findById(filter.id);
	if (filter.name) customer = await customerRepository.findByName(filter.name);

	return customer;
}

async function updateCustomer(id: string, updateCustomer: CreateCustomer) {
	await doesCustomerExists(id);

	for (const phone of updateCustomer.phoneNumbers) {
		await canUpdateNumber(phone.number, id);
	}

	await customerRepository.update(id, updateCustomer);
}

async function deleteCustomer(id: string) {
	await doesCustomerExists(id);

	await customerRepository.deleteCustomer(id);
}

async function isNumberSaved(number: string) {
	const customer = await customerRepository.findPhone(number);

	if (customer.length !== 0) {
		throw error.conflict('Este número já está salvo');
	}
}

async function canUpdateNumber(number: string, id: string) {
	const customer = await customerRepository.findPhone(number);

	if (customer.find((customer) => customer._id.equals(id))) return;

	if (customer.length !== 0) {
		throw error.conflict('Este número já está salvo');
	}
}

async function doesCustomerExists(id: string) {
	const customer = await customerRepository.findById(id);

	if (!customer) {
		throw error.notFound('Cliente não encontrado');
	}

	return customer;
}

async function resetDB() {
	await customerRepository.resetDB();
}

export const customerService = {
	createCustomer,
	deleteCustomer,
	getCustomers,
	getCustomer,
	resetDB,
	updateCustomer,
};
