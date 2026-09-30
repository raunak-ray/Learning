import express from "express";
import * as tasksController from "./tasks.controller.js";

const router = express.Router();

router.get("/", tasksController.getTasks);

router.get("/:id", tasksController.getTaskById);

router.post("/", tasksController.createTask);

router.patch("/:id", tasksController.updateTask);

router.delete("/:id", tasksController.deleteTask);

export default router;