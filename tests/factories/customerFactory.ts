import db from '../../src/database.js';
import { CreateCustomer } from '../../src/repositories/customerRepository.js';

export default async function customerFactory(customer: CreateCustomer) {
	return await db.collection('customers').insertOne(customer);
}
