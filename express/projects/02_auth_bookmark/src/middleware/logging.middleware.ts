import type { Request, Response, NextFunction } from "express";

export default function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const method = req.method;
  const url = req.originalUrl;
  const startTime = Date.now();

  const reqTime = new Date().toISOString();
  console.log(`[${reqTime}] [REQ]  ${method} ${url}`);

  res.on("finish", () => {
    // Error middleware already logs failures — don't double log.
    if (res.statusCode >= 400) return;

    const duration = Date.now() - startTime;
    const resTime = new Date().toISOString();

    console.log(
      `[${resTime}] [RES]  ${method} ${url} ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
}
