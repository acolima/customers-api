import joi from 'joi';

const customerSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().required(),
	address: joi.string().required(),
	phoneNumbers: joi.array().items(joi.string().required()).max(2).required(),
});

export default customerSchema;
