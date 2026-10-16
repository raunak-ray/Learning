import express from "express";
import "dotenv/config";
import { errorMiddleware, notFoundMiddleware } from "./middleware/index";
import { pinoHttp } from "pino-http";
import { logger } from "./utils/logger";

const app = express();

app.use(
  pinoHttp({
    logger,
    quietReqLogger: true,
    serializers: {
         req: (req) => ({
           method: req.method,
           url: req.url,
         }),
         res: (res) => ({
           statusCode: res.statusCode,
         }),
       },
    customSuccessMessage: (
      req,
      res,
    ) => `${req.method} ${req.url} ${res.statusCode}
`,
  }),
);

// parse json object
app.use(express.json());

// route not found middleware
app.use(notFoundMiddleware);
// centralize error middleware
app.use(errorMiddleware);

export default app;
