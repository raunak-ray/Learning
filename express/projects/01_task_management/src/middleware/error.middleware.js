import "dotenv/config";
import { AppError } from "../utils/customError.js";
import { errorResponse } from "../utils/responseHelper.js";

export function errorMiddleware(error, req, res, next) {
    const isProduction = process.env.NODE_ENV === "production";
    console.error(
        `[ERROR] ${error.message} | ${error.code} | ${error.timestamp} \n${isProduction ? "" : error.stack}`
    );

    return errorResponse(res, error);
}
