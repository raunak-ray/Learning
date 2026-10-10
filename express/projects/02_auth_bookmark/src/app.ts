import express from "express";
import authRouter from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Hello from server"
  });
})

app.use("/api/auth", authRouter);

export default app;
