import "dotenv/config";
import { AppError } from "../utils/customError.js";

export function errorMiddleware(error, req, res, next) {
    const isProduction = process.env.NODE_ENV === "production";
    console.error(
        `[ERROR] ${error.message} | ${error.code} | ${error.timestamp} \n${isProduction ? "" : error.stack}`
    );

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            timestamp: error.timestamp,
            code: error.code,
            fields: error.fields
        })
    }

    const timestamp = new Date().toLocaleString("en-US", {
            timezone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium"
        })

    return res.status(500).json({
        message: error.message || "Something went wrong",
        timestamp,
        code: "INTERNAL_SERVER_ERROR",
    })
}
