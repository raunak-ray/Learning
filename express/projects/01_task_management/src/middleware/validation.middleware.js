import z from "zod";
import { ValidationError } from "../utils/customError.js";

export const validate = (schema, source) => {
  return (req, res, next) => {
    const value = req[source];
    const data = schema.safeParse(value);

    if (!data.success) {
      const issues = data.error.issues;
      const fields = [];

      issues.map((item) =>
        fields.push({
          field: item.path[0],
          message: item.message,
        }),
      );

      throw new ValidationError("Validation failed", fields);
    }

    next();
  };
};
