import type { Request, Response } from "express";
import { successResponse } from "../../utils/responseHelper.js";
import * as tasksService from "./tasks.service.js";
import type { CreateTask, DeleteTask, GetTaskById, GetTasks, UpdateTask, UpdateTaskParams } from "./task.schema.js";

export const getTasks = async (req: Request, res: Response) => {
  const { limit = 20, page = 1, cursor = 0, useCursor = false } =
    (req.parsed?.query ?? {}) as GetTasks;

  if (useCursor) {
    const data = await tasksService.fetchTasksByCursor(cursor, limit);
    return successResponse(res, "Tasks fetched successfully using cursor", data);
  }

  const data = await tasksService.fetchTasks(page, limit);
  return successResponse(res, "Tasks fetched successfully using offset", data);
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = (req.parsed?.params ?? {}) as GetTaskById;
  
  const data = await tasksService.fetchTaskById(id);
  
  return successResponse(res, "Task fetched successfully", data);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = (req.parsed?.body ?? {}) as CreateTask;

  const data = await tasksService.createTask(title, description);

  return successResponse(res, "Task created successfully", data, 201);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = (req.parsed?.params ?? {}) as UpdateTaskParams;
  
  const { title, description, status } = (req.parsed?.body ?? {}) as UpdateTask;
  
  const data = await tasksService.updateTask(id, title, description, status);
  
  return successResponse(res, "Task updated successfully", data);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = (req.parsed?.params ?? {}) as DeleteTask;

  const data = await tasksService.deleteTask(id);
  
  return successResponse(res, "Task deleted successfully", data);
};
