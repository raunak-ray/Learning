import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/AppError.js";
import { verifyToken } from "../modules/auth/auth.helpers.js";

export function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const token = extractToken(req);

  if (!token) {
    throw new UnauthorizedError("Authentication required");
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }

  next();
}

const extractToken = (req: Request): string | null => {
  const header = req.headers.authorization;

  if (typeof header !== "string") return null;

  const [type, token] = header.split(" ");

  return type === "Bearer" && token ? token : null;
};
