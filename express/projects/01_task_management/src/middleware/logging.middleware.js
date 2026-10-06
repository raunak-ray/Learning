import { getTimestamp } from "../utils/helpers.js";

export function loggingMiddleware(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = getTimestamp();

    console.log(
        `[${method}] ${url} - ${timestamp}`
    );
    
    next();
}
