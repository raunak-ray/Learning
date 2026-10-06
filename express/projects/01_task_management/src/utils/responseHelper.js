import { AppError } from "./customError.js";
import { getTimestamp } from "./helpers.js";

export const successResponse = (res, message = "Success", data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        message,
        data
    });
}

export const errorResponse = (res, error) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            timestamp: error.timestamp,
            code: error.code,
            fields: error.fields
        })
    }

    const timestamp = getTimestamp();

    return res.status(500).json({
        message: error.message || "Something went wrong",
        timestamp,
        code: "INTERNAL_SERVER_ERROR",
    })
} 
