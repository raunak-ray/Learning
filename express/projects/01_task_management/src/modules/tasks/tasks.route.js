import express from "express";
import * as tasksController from "./tasks.controller.js";
import { validate } from "../../middleware/index.js";
import * as taskSchema from "./task.schema.js";

const router = express.Router();

router.get(
  "/",
  validate(taskSchema.getTasksSchema, "query"),
  tasksController.getTasks,
);

router.get(
  "/:id",
  validate(taskSchema.getTaskSchema, "params"),
  tasksController.getTaskById,
);

router.post(
  "/",
  validate(taskSchema.createTaskSchema, "body"),
  tasksController.createTask,
);

router.patch(
  "/:id",
  validate(taskSchema.updateTaskParamsSchema, "params"),
  validate(taskSchema.updateTaskSchema, "body"),
  tasksController.updateTask,
);

router.delete(
  "/:id",
  validate(taskSchema.deleteTaskSchema, "params"),
  tasksController.deleteTask,
);

export default router;
