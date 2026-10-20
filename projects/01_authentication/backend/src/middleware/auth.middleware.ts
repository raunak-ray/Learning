import { JWTPayload, verifyToken } from "@/modules/auth/auth.helpers";
import { UnauthorizedError } from "@/utils/AppError";
import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const header = req.headers["authorization"];

  if (!header) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const [type, token] = header?.split(" ");

  if (type.toLowerCase() !== "bearer" || token === null) {
    throw new UnauthorizedError("Invalid token type or value");
  }

  const decoded = verifyToken(token);

  req.user = decoded;

  next();
}
