export const TASK_STATUS = ["pending", "in-progress", "completed"];

export const TASK_QUERY = {
    create: `
        INSERT INTO tasks (title, description)
        VALUES ($1, $2)
        RETURNING *;
    `,

    getAll: `
        SELECT * FROM tasks
        LIMIT $1 OFFSET $2;
    `,

    getAllByCursor: `
        SELECT * FROM tasks
        WHERE id > $1
        ORDER BY id ASC
        LIMIT $2;
    `,

    getById: `
        SELECT * FROM tasks
        WHERE id = $1;
    `,

    updateById: (fields, id) => {
        return `
            UPDATE tasks
            SET ${fields}, updated_at = NOW()
            WHERE id = ${id}
            RETURNING *;
        `
    },

    deleteById: `
        DELETE FROM tasks
        WHERE id = $1;
    `,
};
