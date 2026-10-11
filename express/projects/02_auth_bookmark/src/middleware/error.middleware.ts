import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/responseHelpers.js";
import { unwrapPgError, mapPgError } from "../utils/dbError.js";

const timestamp = () => new Date().toISOString();

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  const path = req.originalUrl;
  const method = req.method;

  if (error instanceof AppError) {
    const fields = error.errors?.length
      ? " | " +
        error.errors.map((e) => `\n ${e.field}: ${e.message}`).join(", ")
      : "";

    console.log(
      `[${timestamp()}] [ERROR] ${method} ${path} ${error.statusCode} - ${error.message}${fields}`,
    );

    return errorResponse(
      res,
      error.message,
      error.statusCode,
      error.code,
      error.errors,
    );
  }

  const pgError = unwrapPgError(error);

  if (pgError) {
    const details = [
      pgError.code ? `code=${pgError.code}` : null,
      pgError.table ? `table=${pgError.table}` : null,
      pgError.column ? `column=${pgError.column}` : null,
      pgError.constraint ? `constraint=${pgError.constraint}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    console.error(
      `[${timestamp()}] [DB ERROR] ${method} ${path} 500 - ${pgError.message}${details ? ` | ${details}` : ""}`,
    );

    const mapped = mapPgError(pgError);
    return errorResponse(res, mapped.message, mapped.statusCode, mapped.code);
  }

  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  console.error(
    `[${timestamp()}] [ERROR] ${method} ${path} 500 - ${message}`,
  );

  return errorResponse(res, message, 500, "INTERNAL_SERVER_ERROR");
}
