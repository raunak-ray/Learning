import type z from "zod";
import type { Request, Response, NextFunction } from "express";
import type { Fields } from "../utils/types.js";
import { BadRequestError } from "../utils/AppError.js";

export type Source = "body" | "params" | "query";

export const validate =
  (schema: z.ZodType, source: Source = "body") =>
  (req: Request, _: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors: Fields[] = result.error.issues.map((issue) => {
        return {
          field: issue.path.join(", "),
          message: issue.message,
        };
      });

      throw new BadRequestError("Validation failed", errors);
    }

    req[source] = result.data;

    next();
  };
