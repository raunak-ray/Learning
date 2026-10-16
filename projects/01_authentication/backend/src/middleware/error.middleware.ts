import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { getTimestamp } from "@/utils/helpers";
import { logger } from "@/utils/logger";
import { errorResponse } from "@/utils/responseHelpers";

export function errorMiddleware(
	err: unknown,
	req: Request,
	res: Response,
	_next: NextFunction,
) {
	const timestamp = getTimestamp();
	const { method, originalUrl } = req;

	if (err instanceof AppError) {
		// console.error(
		//   `[${timestamp}] [ERROR] ${method} ${originalUrl} | ${err.name} | ${err.code} | ${err.message}`,
		// );

		logger.error(
			{
				method,
				url: originalUrl,
				code: err.code,
				fields: err.fields ? err.fields : undefined,
			},
			err.message,
		);

		return errorResponse(res, {
			statusCode: err.statusCode,
			message: err.message,
			code: err.code,
			fields: err.fields,
		});
	}

	const message =
		err instanceof Error ? err.message : "An unexpected error occurred.";

	console.error(
		`[${timestamp}] [ERROR] ${method} ${originalUrl} | ${message}`,
		err instanceof Error ? err.stack : err,
	);

	logger.error(
		{
			err,
			method,
			url: originalUrl,
		},
		message,
	);

	return errorResponse(res, {
		statusCode: 500,
		message,
	});
}
