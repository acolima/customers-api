import { CreateCustomer } from '../../src/repositories/customerRepository';
import { faker } from '@faker-js/faker';

export default function customerBodyFactory() {
	const customer: CreateCustomer = {
		name: faker.name.firstName(),
		email: faker.internet.email(),
		phoneNumbers: [{ number: faker.phone.number(), type: 'home' }],
	};

	return customer;
}
