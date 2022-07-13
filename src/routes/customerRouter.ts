import { Router } from 'express';
import { customerController } from '../controllers/customerController.js';
import schemaValidation from '../middlewares/validateSchema.js';
import customerSchema from '../schemas/customerSchema.js';

const customerRouter = Router();

customerRouter.post(
	'/',
	schemaValidation(customerSchema),
	customerController.createCustomer
);

customerRouter.get('/', customerController.getCustomers);

customerRouter.put(
	'/:id',
	schemaValidation(customerSchema),
	customerController.updateCustomer
);

customerRouter.delete('/:id', customerController.deleteCustomer);

export default customerRouter;
