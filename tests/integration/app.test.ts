import supertest from 'supertest';
import app from '../../src/index.js';
import db, { mongoClient } from '../../src/database.js';
import customerBodyFactory from '../factories/customerBodyFactory.js';
import customerFactory from '../factories/customerFactory.js';
import {
	findCustomers,
	findCustomerById,
	findCustomerByName,
} from '../utils/testsUtils.js';

describe('App tests', () => {
	const customersCollection = db.collection('customers');

	beforeEach(async () => {
		await customersCollection.deleteMany({});
	});

	afterAll(() => {
		mongoClient.close();
	});

	describe('GET /health', () => {
		it('should return status 200', async () => {
			const result = await supertest(app).get('/health');

			expect(result.status).toEqual(200);
		});
	});

	describe('POST /customers', () => {
		it('should return status 201 and persist customer', async () => {
			const customer = customerBodyFactory();

			const result = await supertest(app).post('/customers').send(customer);

			const createdCustomer = await findCustomerByName(customer.name);

			expect(result.status).toEqual(201);
			expect(createdCustomer).not.toBe(null);
		});
	});

	describe('GET /customers', () => {
		it('should return status 200 and an array of customers', async () => {
			const customer = customerBodyFactory();
			await customerFactory(customer);

			const result = await supertest(app).get('/customers');

			expect(result.body.length).toBeGreaterThan(0);
			expect(result.status).toEqual(200);
		});
	});

	describe('GET /customers/search', () => {
		it('should return status 200 and one customer given id as a query param', async () => {
			const customer = customerBodyFactory();
			const { insertedId } = await customerFactory(customer);

			const result = await supertest(app).get(
				`/customers/search?id=${insertedId}`
			);

			expect(result.body.name).toEqual(customer.name);
			expect(result.status).toEqual(200);
		});

		it('should return status 200 and an array of customers given name as a query param', async () => {
			const customer1 = customerBodyFactory();
			const customer2 = {
				...customer1,
				phoneNumbers: [{ number: '19999999999', type: 'home' }],
			};

			await customerFactory(customer1);
			await customerFactory(customer2);

			const result = await supertest(app).get(
				`/customers/search?name=${customer1.name}`
			);

			expect(result.body.length).toBeGreaterThan(1);
			expect(result.status).toEqual(200);
		});
	});

	describe('PUT /customers', () => {
		it('should return status 200 and persist changes', async () => {
			const customer = customerBodyFactory();
			const { insertedId } = await customerFactory(customer);

			const newPhone = { number: '19999999999', type: 'mobile' };

			const result = await supertest(app)
				.put(`/customers/${insertedId}`)
				.send({
					name: customer.name,
					email: customer.email,
					phoneNumbers: [newPhone],
				});

			const updatedCustomer = await findCustomerById(insertedId);

			expect(updatedCustomer.phoneNumbers).toEqual([newPhone]);
			expect(result.status).toEqual(200);
		});
	});

	describe('DELETE /customers', () => {
		it('should return status 200 and remove customer', async () => {
			const customer = customerBodyFactory();
			const { insertedId } = await customerFactory(customer);

			const result = await supertest(app).delete(`/customers/${insertedId}`);

			const customers = await findCustomers();

			expect(customers.length).toEqual(0);
			expect(result.status).toEqual(200);
		});
	});
});
