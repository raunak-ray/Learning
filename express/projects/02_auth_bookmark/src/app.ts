import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

app.use("/api/auth", authRouter);

app.use(errorMiddleware);

export default app;
