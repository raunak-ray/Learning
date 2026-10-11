import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import loggingMidleware from "./middleware/logging.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";

const app = express();

app.use(express.json());
app.use(loggingMidleware);

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

app.use("/api/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
