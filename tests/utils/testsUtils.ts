import { ObjectId } from 'mongodb';
import db from '../../src/database.js';

const customersCollection = db.collection('customers');

async function findCustomerByName(name: string) {
	return await customersCollection.findOne({
		name,
	});
}

async function findCustomers() {
	return await customersCollection.find().toArray();
}

async function findCustomerById(id: ObjectId) {
	return await customersCollection.findOne({ _id: new ObjectId(id) });
}

export { findCustomerByName, findCustomerById, findCustomers };
