import { NextFunction, Request, Response } from 'express';
import { error } from '../utils/errorsUtils.js';

export function schemaValidation(schema: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body);
		if (validation.error) {
			throw error.unprocessableEntity(validation.error.message);
		}

		next();
	};
}

export default schemaValidation;
