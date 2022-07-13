import supertest from 'supertest';
import app from '../src/index.js';

describe('app tests', () => {
	it('should return status 200', async () => {
		const result = await supertest(app).get('/health');

		expect(result.status).toEqual(200);
	});
});
