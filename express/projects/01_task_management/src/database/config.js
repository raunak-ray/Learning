import pg from "pg";

const user = process.env.POSTGRES_USER || "postgres";
const password = process.env.POSTGRES_PASSWORD || "postgres";
const host = process.env.POSTGRES_HOST || "localhost";
const port = process.env.POSTGRES_PORT || 5432;
const database = process.env.POSTGRES_DB || "task_management";

const pool = new pg.Pool({
    user,
    password,
    host,
    port,
    database,
});

const connectToDb = async () => {
    try {
        const connection = await pool.connect();
        console.log("Connected to the database:", connection.database)
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
    }
};

export default connectToDb;
