import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { errorResponse } from "../utils/responseHelpers.js";
import { unwrapPgError, mapPgError } from "../utils/dbError.js";

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

    console.log(`[ERROR] ${method} ${path} | ${error.message}${fields}\n`);

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
    console.error(`\n[DB ERROR] ${method} ${path}\n`, {
      code: pgError.code,
      table: pgError.table,
      column: pgError.column,
      constraint: pgError.constraint,
      message: pgError.message,
    });

    const mapped = mapPgError(pgError);
    return errorResponse(res, mapped.message, mapped.statusCode, mapped.code);
  }

  console.error(`[ERROR] ${method} ${path}`, error);

  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  return errorResponse(res, message, 500, "INTERNAL_SERVER_ERROR");
}
