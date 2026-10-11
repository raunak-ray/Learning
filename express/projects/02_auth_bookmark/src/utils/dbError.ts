import { DrizzleQueryError } from "drizzle-orm";
import { DatabaseError } from "pg";

export const unwrapPgError = (error: unknown): DatabaseError | null => {
  if (error instanceof DatabaseError) return error;

  if (
    error instanceof DrizzleQueryError &&
    error.cause instanceof DatabaseError
  ) {
    return error.cause;
  }

  return null;
};

const PG_ERROR_CODE = {
  NOT_NULL_VIOLATION: "23502",
  UNIQUE_VIOLATION: "23505",
} as const;

const UNIQUE_FIELD_MESSAGE: Record<string, string> = {
  tbl_users_email_unique: "This email is already registered.",
};

export type PgErrorMap = {
  message: string;
  statusCode: number;
  code: string;
};

export const mapPgError = (pgError: DatabaseError): PgErrorMap => {
  switch (pgError.code) {
    case PG_ERROR_CODE.NOT_NULL_VIOLATION:
      return {
        message: `${pgError.column ?? "A required field"} is required.`,
        statusCode: 400,
        code: "MISSING_FIELD",
      };

    case PG_ERROR_CODE.UNIQUE_VIOLATION:
      return {
        message:
          UNIQUE_FIELD_MESSAGE[pgError.constraint ?? ""] ??
          "This value is already in use.",
        statusCode: 409,
        code: "CONFLICT",
      };

    default:
      return {
        message: "Something went wrong. Please try again.",
        statusCode: 500,
        code: "DB_ERROR",
      };
  }
};
