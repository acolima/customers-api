export interface AppError {
	type: 'conflict' | 'unprocessable_entity' | 'not_found';
	message: string;
}

function unprocessableEntity(message: string): AppError {
	return { type: 'unprocessable_entity', message };
}

function conflict(message: string): AppError {
	return { type: 'conflict', message };
}

function notFound(message: string): AppError {
	return { type: 'not_found', message };
}

export const error = { conflict, notFound, unprocessableEntity };
