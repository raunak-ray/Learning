import type { Fields } from "./types";

type AppErrorOptions = {
	statusCode?: number;
	code?: string;
	fields?: Fields[];
};

export class AppError extends Error {
	readonly statusCode: number;
	readonly code: string;
	readonly fields?: Fields[];

	constructor(
		message: string = "Something went wrong",
		{
			statusCode = 500,
			code = "INTERNAL_SERVER_ERROR",
			fields,
		}: AppErrorOptions = {},
	) {
		super(message);

		this.name = new.target.name;
		this.statusCode = statusCode;
		this.code = code;
		this.fields = fields;
	}
}

export class BadRequestError extends AppError {
	constructor(message: string = "Bad request", fields: Fields[] = []) {
		super(message, {
			statusCode: 400,
			code: "BAD_REQUEST",
			fields: fields.length > 0 ? fields : undefined,
		});
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = "Unauthorized access") {
		super(message, {
			statusCode: 401,
			code: "UNAUTHORIZED",
		});
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = "Resource not found") {
		super(message, {
			statusCode: 404,
			code: "NOT_FOUND",
		});
	}
}

export class ConflictError extends AppError {
	constructor(message: string = "Resource already exists") {
		super(message, {
			statusCode: 409,
			code: "CONFLICT",
		});
	}
}
