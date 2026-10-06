import { ValidationError } from "../../utils/customError.js";
import { successResponse } from "../../utils/responseHelper.js";
import * as tasksService from "./tasks.service.js";

export const getTasks = async (req, res) => {
  const { limit = 20, page = 1, cursor = 0, useCursor = false } = req.query;

  if (useCursor) {
    const data = await tasksService.fetchTasksByCursor(cursor, limit);

    return successResponse(
      res,
      "Tasks fetched successfully using cursor",
      data,
    );
  }

  const data = await tasksService.fetchTasks(page, limit);

  return successResponse(res, "Tasks fetched successfully using offset", data);
};

export const getTaskById = async (req, res) => {
  const id = req.params.id;

  const data = await tasksService.fetchTaskById(id);

  return successResponse(res, "Task fetched successfully", data);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  const data = await tasksService.createTask(title, description);
  return successResponse(res, "Task created successfully", data, 201);
};

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;

  const data = await tasksService.updateTask(id, title, description, status);

  return successResponse(res, "Task updated successfully", data);
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;

  const data = await tasksService.deleteTask(id);

  return successResponse(res, "Task deleted successfully", data);
};
