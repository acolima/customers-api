import { jest } from '@jest/globals';
import { ObjectId } from 'mongodb';
import { mongoClient } from '../../src/database.js';
import { customerRepository } from '../../src/repositories/customerRepository.js';
import { customerService } from '../../src/services/customerService.js';

describe('customer service unit test', () => {
	afterAll(() => {
		mongoClient.close();
	});

	it('should throw conflict error given duplicate number on create', async () => {
		const customer = {
			_id: new ObjectId('123456789101'),
			name: 'João',
			email: 'joao@gmail.com',
			phoneNumbers: [
				{ number: '19982390863', type: 'mobile' },
				{ number: '19982390863', type: 'mobile' },
			],
		};

		jest.spyOn(customerRepository, 'findPhone').mockResolvedValue([customer]);

		const create = jest.spyOn(customerRepository, 'create');

		expect(async () => {
			await customerService.createCustomer(customer);
		}).rejects.toEqual({
			type: 'conflict',
			message: 'Este número já está salvo',
		});

		expect(create).not.toBeCalled();
	});

	it('should throw not found error given unexistent id', async () => {
		jest.spyOn(customerRepository, 'findById').mockResolvedValue(null);

		const deleteCustomer = jest.spyOn(customerRepository, 'deleteCustomer');

		expect(async () => {
			await customerService.deleteCustomer('123456789101');
		}).rejects.toEqual({
			type: 'not_found',
			message: 'Cliente não encontrado',
		});

		expect(deleteCustomer).not.toBeCalled();
	});

	it('should throw conflict error given duplicated phone number on update', async () => {
		const customer1 = {
			_id: new ObjectId('123456789101'),
			name: 'João',
			email: 'joao@gmail.com',
			phoneNumbers: [
				{ number: '19982390863', type: 'mobile' },
				{ number: '19982390863', type: 'mobile' },
			],
		};

		const customer2 = {
			_id: new ObjectId('101987654321'),
			name: 'Maria',
			email: 'maria@gmail.com',
			phoneNumbers: [
				{ number: '19982390863', type: 'mobile' },
				{ number: '19982390863', type: 'mobile' },
			],
		};

		jest.spyOn(customerRepository, 'findById').mockResolvedValue(customer1);

		jest.spyOn(customerRepository, 'findPhone').mockResolvedValue([customer2]);

		const updateCustomer = jest.spyOn(customerRepository, 'update');

		expect(async () => {
			await customerService.updateCustomer(customer1._id.toString(), customer1);
		}).rejects.toEqual({
			type: 'conflict',
			message: 'Este número já está salvo',
		});

		expect(updateCustomer).not.toBeCalled();
	});
});
