import { ObjectId } from 'mongodb';
import db from '../database.js';

export interface CreateCustomer {
	name: string;
	email: string;
	phoneNumbers: Phone[];
}

interface Phone {
	number: string;
	type: string;
}

const customersCollection = db.collection('customers');

async function create(customer: CreateCustomer) {
	await customersCollection.insertOne(customer);
}

async function findPhone(number: string) {
	return await customersCollection
		.find({
			phoneNumbers: { $elemMatch: { number: number } },
		})
		.toArray();
}

async function findById(id: string) {
	return await customersCollection.findOne({ _id: new ObjectId(id) });
}

async function findByName(name: string) {
	return await customersCollection
		.find({ name: new RegExp(name, 'i') })
		.toArray();
}

async function getAll() {
	return customersCollection.find({}).sort({ name: 1 }).toArray();
}

async function update(id: string, customer: CreateCustomer) {
	await customersCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: customer }
	);
}

async function deleteCustomer(id: string) {
	await customersCollection.deleteOne({ _id: new ObjectId(id) });
}

export const customerRepository = {
	create,
	deleteCustomer,
	findById,
	findByName,
	findPhone,
	getAll,
	update,
};
