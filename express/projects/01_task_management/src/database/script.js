import { pool } from "./config.js";

async function seedData(start, end) {
    try {
        const result = await pool.query(
            `
            INSERT INTO tasks (title, description, status)
            SELECT
                'Task ' || i,
                'Description for task ' || i,
                'pending'
            FROM generate_series($1::integer, $2::integer) AS i
            `,
            [start, end]
        );

        console.log(`Successfully seeded Task ${start} → Task ${end}`);
        console.log(`Rows inserted: ${result.rowCount}`);
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        await pool.end();
    }
}

seedData(50001, 100000);
