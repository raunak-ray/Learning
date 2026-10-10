import type { Response } from "express";
import type { Fields } from "./types.js";

export function successResponse<T = null>(
  res: Response,
  message: string = "Success",
  statusCode: number = 200,
  data: T = null as T,
): Response {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  message: string = "Something went wrong",
  statusCode: number = 500,
  fields?: Fields[],
): Response {
  return res.status(statusCode).json({
    success: false,
    message: message,
    fields,
  });
}
