import type { Response } from "express";
import { Fields } from "./types";

type SuccessProps<T> = {
	message?: string;
	statusCode?: number;
	data: T | T[] | null;
};

export function successResponse<T>(
	res: Response,
	{
		message = "Request Successfull",
		statusCode = 200,
		data = null,
	}: SuccessProps<T>,
) {
	return res.status(statusCode).json({
		success: true,
		message,
		data,
	});
}

type ErrorProps = {
	message?: string;
	statusCode?: number;
	code?: string;
	fields?: Fields[];
};

export function errorResponse(
	res: Response,
	{
		message = "Something went wrong",
		statusCode = 500,
		code = undefined,
		fields = undefined,
	}: ErrorProps,
) {
	return res.status(statusCode).json({
		success: false,
		message,
		code,
		fields,
	});
}
