import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/customError.js";
import { errorResponse } from "../utils/responseHelper.js";

export function errorMiddleware(
  error: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // const isProduction = process.env.NODE_ENV === "production";
  // console.error(
  //     `[ERROR] ${error.message} | ${error.code} | ${error.timestamp} \n${isProduction ? "" : error.stack}`
  // );

  console.error(
    `[ERROR] ${error.message} | ${error.code} | ${error.timestamp}`,
  );

  return errorResponse(res, error);
}
