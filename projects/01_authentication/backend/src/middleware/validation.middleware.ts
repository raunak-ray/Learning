import type { NextFunction, Request, RequestHandler, Response } from "express";
import type z from "zod";
import { BadRequestError } from "@/utils/AppError";
import type { Fields } from "@/utils/types";

type SchemaSource = "body" | "params" | "query";

export function validate<T extends z.ZodType>(
	schema: T,
	source: SchemaSource = "body",
): RequestHandler {
	return (req: Request, _res: Response, next: NextFunction) => {
		const input = req[source];

		const result = schema.safeParse(input);

		if (!result.success) {
			const fields: Fields[] = result.error.issues.map((issue) => {
				return {
					field: issue.path.join(", "),
					message: issue.message,
				};
			});

			next(new BadRequestError("Validation failed", fields));
		}

		if (source === "query") {
			Object.defineProperty(req, "query", {
				value: result.data,
			});
		} else {
			req[source] = result.data;
		}

		next();
	};
}
