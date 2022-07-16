import joi from 'joi';

const customerSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().required(),
	phoneNumbers: joi
		.array()
		.items({
			number: joi.string().required(),
			type: joi.string().valid('home', 'mobile').required(),
		})
		.max(2)
		.required(),
});

export default customerSchema;
