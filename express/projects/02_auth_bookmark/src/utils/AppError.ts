import type { Fields } from "./types.js";

export class AppError extends Error {
  statusCode: number;
  code: string;
  errors: Fields[] | undefined;

  constructor(
    message: string,
    statusCode?: number,
    code?: string,
    errors?: Fields[],
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode ?? 500;
    this.code = code ?? "INTERNAL_SERVER_ERROR";
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request", errors?: Fields[]) {
    super(message, 400, "BAD_REQUEST", errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}
