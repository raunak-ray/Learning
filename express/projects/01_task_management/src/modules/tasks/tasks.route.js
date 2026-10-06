import express from "express";
import * as tasksController from "./tasks.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import {
  createTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  getTasksSchema,
  updateTaskParamsSchema,
  updateTaskSchema,
} from "./task.schema.js";

const router = express.Router();

router.get("/", validate(getTasksSchema, "query"), tasksController.getTasks);

router.get(
  "/:id",
  validate(getTaskSchema, "params"),
  tasksController.getTaskById,
);

router.post(
  "/",
  validate(createTaskSchema, "body"),
  tasksController.createTask,
);

router.patch(
  "/:id",
  validate(updateTaskParamsSchema, "params"),
  validate(updateTaskSchema, "body"),
  tasksController.updateTask,
);

router.delete(
  "/:id",
  validate(deleteTaskSchema, "params"),
  tasksController.deleteTask,
);

export default router;
