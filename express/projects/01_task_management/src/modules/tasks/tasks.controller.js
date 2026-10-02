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

        return res.json({
            message: "Tasks fetched successfully using cursor",
            data
        });
    }

    const data = await tasksService.fetchTasks(
        parseInt(limit),
        parseInt(page)
    );

    return res.json({
        message: "Tasks fetched successfully using offset",
        data
    });
};

export const getTaskById = async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await tasksService.fetchTaskById(id);

    if (!data) {
        return res.json({
            message: "Not found"
        })
    }

    return res.json({
        message: `Task with id ${id}`,
        data
    });
}

export const createTask = async (req, res) => {
    const {title, description} = req.body;

    if (!title) {
        return res.json({
            message: 'Send title in response body'
        })
    }

    const data = await tasksService.createTask(title, description);
    return res.json({
        message: "Create task",
        data
    });
}

export const updateTask = async (req, res) => {
    const id = parseInt(req.params.id);
    const {title, description, status} = req.body;

    if (!title && !description && !status) {
        return res.json({
            message: 'Send at least one field to update'
        });
    }

    if (status) {
        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            return res.json({
                message: 'Invalid status'
            });
        }
    }

    let data;
    
    try {
        data = await tasksService.updateTask(id, title, description, status);
    }
    catch (error) {
        return res.json({
            message: error.message
        });
    }
    
    return res.json({
        mesage: `Update task with id ${id}`,
        data
    });
}

export const deleteTask = async (req, res) => {
    const id = parseInt(req.params.id);

    let data = null;

    try {
        data = await tasksService.deleteTask(id);
    } catch (error) {
        return res.json({
            message: error.message
        });
    }

    return res.json({
        message: `Delete task with id ${id}`,
        data
    });
}
