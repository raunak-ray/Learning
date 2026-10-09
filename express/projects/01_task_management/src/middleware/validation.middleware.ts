import z from "zod";
import type { Request, Response, NextFunction } from "express";
import { ValidationError, type Fields } from "../utils/customError.js";

export type Source = "body" | "params" | "query";

type ValidatedBag = {
  query?: unknown;
  params?: unknown;
  body?: unknown;
};

declare global {
  namespace Express {
    interface Request {
      parsed?: ValidatedBag;
    }
  }
}

export const validate = (schema: z.ZodType, source: Source) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = schema.safeParse(req[source]);

    if (!data.success) {
      const fields: Fields[] = data.error.issues.map((item) => ({
        field: item.path[0] as string,
        message: item.message,
      }));
      throw new ValidationError("Validation failed", fields);
    }

    // Merge into the bag rather than replacing it — a route can validate
    // params AND query AND body, and each call must not clobber the others.
    req.parsed = { ...req.parsed, [source]: data.data };

    next();
  };
};
