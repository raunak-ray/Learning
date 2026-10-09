import express from "express";
import tasksRouter from "./modules/tasks/tasks.route.js";
import { errorMiddleware, loggingMiddleware } from "./middleware/index.js";

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Task Management API"
    });
});

app.use("/api/tasks", tasksRouter);

app.use(errorMiddleware);

export default app;
