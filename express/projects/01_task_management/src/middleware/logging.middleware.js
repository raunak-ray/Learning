export function loggingMiddleware(req, res, next) {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        timeStyle: "medium",
        dateStyle: "medium"
    });

    console.log(
        `[${method}] ${url} - ${timestamp}`
    );
    
    next();
}
