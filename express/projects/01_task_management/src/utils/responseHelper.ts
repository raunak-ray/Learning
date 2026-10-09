import type { Response } from "express";
import { AppError } from "./customError.js";
import { getTimestamp } from "./helpers.js";

export const successResponse = (res: Response, message = "Success", data: unknown = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        message,
        data
    });
}

export const errorResponse = (res: Response, error: unknown) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            timestamp: error.timestamp,
            code: error.code,
            fields: error.fields
        })
    }

    const timestamp: string = getTimestamp();
    let message: string;

    if (error instanceof Error) {
        message = error.message;
    }
    else message = "Something went wrong!";

    return res.status(500).json({
        message,
        timestamp,
        code: "INTERNAL_SERVER_ERROR",
    })
} 
