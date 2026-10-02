export class AppError extends Error {
    constructor(message = "Something went wrong!", statusCode = 500, code = "INTERNAL_SERVER_ERROR", fields = undefined) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.fields = fields;
        this.timestamp = new Date().toLocaleString("en-US", {
            timezone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium"
        })
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401, "UNAUTHORIZED");
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden resource") {
        super(message, 403, "FORBIDDEN");
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404, "NOT_FOUND");
    }
}

export class ValidationError extends AppError {
    constructor(message = "Validation failed", fields = []) {
        super(message, 400, "VALIDATION_ERROR", fields);
    }
}