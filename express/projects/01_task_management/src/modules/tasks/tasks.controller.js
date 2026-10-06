import { ValidationError } from "../../utils/customError.js";
import { successResponse } from "../../utils/responseHelper.js";
import * as tasksService from "./tasks.service.js";

export const getTasks = async (req, res) => {
    const {
        limit = 20,
        page = 1,
        cursor = 0
    } = req.query;

    const useCursor = req.query.useCursor === "true";

    if (useCursor) {
        const data = await tasksService.fetchTasksByCursor(
            parseInt(cursor),
            parseInt(limit)
        );

        return successResponse(res, "Tasks fetched successfully using cursor", data);
    }

    const data = await tasksService.fetchTasks(
        parseInt(limit),
        parseInt(page)
    );

    return successResponse(res, "Tasks fetched successfully using offset", data);
};

export const getTaskById = async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await tasksService.fetchTaskById(id);

    return successResponse(res, "Task fetched successfully", data);
}

export const createTask = async (req, res) => {
    const {title, description} = req.body;

    const fieldsError = [];

    if (!title) {
        fieldsError.push({
            field: "title",
            message: "Title is required"
        })
    }

    if (fieldsError.length > 0) {
        throw new ValidationError("Validation failed", fieldsError);
    }

    const data = await tasksService.createTask(title, description);
    return successResponse(res, "Task created successfully", data, 201);
}

export const updateTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const {title, description, status} = req.body;

    const fieldsError = [];

    if (!title && !description && !status) {
        fieldsError.push({
            field: "body",
            message: "At least one field is required (title, description, status)"
        })
    }

    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
        fieldsError.push({
            field: "status",
            message: "Status may be only of the following values: ('pending', 'in-progress', 'completed')"
        })
    }

    if (fieldsError.length > 0) {
        throw new ValidationError("Validation failed", fieldsError);
    }

    const data = await tasksService.updateTask(id, title, description, status);
    
    return successResponse(res, "Task updated successfully", data);
}

export const deleteTask = async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await tasksService.deleteTask(id);

    return successResponse(res, "Task deleted successfully", data);
}
