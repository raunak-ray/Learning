import type { NextFunction, Request, Response } from "express";
import { getTimestamp } from "../utils/helpers.js";

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.url;
    const timestamp = getTimestamp();

    console.log(
        `[${method}] ${url} - ${timestamp}`
    );
    
    next();
}
