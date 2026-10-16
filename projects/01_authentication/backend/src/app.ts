import express from "express";
import "dotenv/config";
import { errorMiddleware, notFoundMiddleware } from "./middleware/index";

const app = express();

// parse json object
app.use(express.json());

// route not found middleware
app.use(notFoundMiddleware);
// centralize error middleware
app.use(errorMiddleware);

export default app;
