import type { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../utils/AppError.js";

export default function notFoundMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  next(new NotFoundError(`Route ${req.method} ${req.url} is not found`));
}
