import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorsUtils.js';

export default function errorHandler(
	error: Error | AppError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log(error);

	if ('type' in error) {
		switch (error.type) {
			case 'unprocessable_entity':
				return res.status(422).send(error.message);
			case 'conflict':
				return res.status(409).send(error.message);
			case 'not_found':
				return res.status(404).send(error.message);
		}
	}
	res.sendStatus(500);
}
