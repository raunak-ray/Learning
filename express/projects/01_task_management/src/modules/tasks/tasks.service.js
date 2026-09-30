import {pool} from "../../database/config.js";
import { TASK_QUERY } from "./constant.js";

export const fetchTasks = async () => {
    const result = await pool.query(TASK_QUERY.getAll);

    return result.rows;
}

export const createTask = async (title, description = null) => {
    const result = await pool.query(TASK_QUERY.create, [title, description]);

    return result.rows[0];
}

export const fetchTaskById = async (id) => {
    const result = await pool.query(TASK_QUERY.getById, [id]);

    return result.rows[0];
}

export const deleteTask = async (id) => {
    const existing = await fetchTaskById(id);

    if (!existing) {
        throw new Error("Task not found");
    }
    const result = await pool.query(TASK_QUERY.deleteById, [id]);

    return null;
}

export const updateTask = async (id, title = null, description = null, status = null) => {
    const fields = [];
    const values = [];

    if (title) {
        fields.push("title = $1");
        values.push(title);
    }

    if (description) {
        if (title) {
            fields.push("description = $2");
            
        } else {
            fields.push("description = $1");
        }

        values.push(description);
    }

    if (status) {
        if (title && description) {
            fields.push("status = $3");
            
        } else if (title || description) {
            fields.push("status = $2");
        } else {
            fields.push("status = $1");
        }

        values.push(status);
    }

    const existing = await fetchTaskById(id);

    if (!existing) {
        throw new Error("Task not found");
    }

    const result = await pool.query(TASK_QUERY.updateById(fields.join(", "), id), values);

    return result.rows[0];
}
