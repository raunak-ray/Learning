import express from "express";
import tasksRouter from "./modules/tasks/tasks.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Task Management API"
    });
});

app.use("/api/tasks", tasksRouter);

export default app;
