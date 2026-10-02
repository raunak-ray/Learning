import {pool} from "../../database/config.js";
import { TASK_QUERY } from "./constant.js";

export const fetchTasks = async (limit, page) => {
    const offset = (page - 1) * limit;
    
    const [result, count] = await Promise.all([
        pool.query(TASK_QUERY.getAll, [limit, offset]),
        pool.query("SELECT COUNT(*) FROM tasks")
    ])

    const total = parseInt(count.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        tasks: result.rows,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage
    };
}

export const fetchTasksByCursor = async (cursor, limit) => {
    const result = await pool.query(TASK_QUERY.getAllByCursor, [cursor, limit + 1]);

    const tasks = result.rows.slice(0, limit);
    const nextCursor = tasks.length > 0 ? tasks[limit - 1] : null;
    const hasMore = nextCursor !== null;

    return {
        tasks,
        nextCursor: nextCursor ? nextCursor.id : null,
        hasMore
    }
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
