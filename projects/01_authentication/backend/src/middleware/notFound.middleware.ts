import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@/utils/AppError";

export function notFoundMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction,
) {
	const error = new NotFoundError(
		`Route not found: ${req.method} ${req.originalUrl}`,
	);

	next(error);
}
