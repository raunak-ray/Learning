import { pool } from "./config.js";

export const createTables = async () => {
    try {
        await pool.query(CREATE_STATUS_ENUM_QUERY);
        await pool.query(CREATE_TASKS_TABLE_QUERY);
        console.log("Tables created successfully");
    }
    catch (error) {
        console.error("Error creating tables", error);
    }
}

const CREATE_TASKS_TABLE_QUERY = `
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
`
const CREATE_STATUS_ENUM_QUERY = `
    DO $$
    BEGIN
        CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'completed');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END 
    $$;
`;
