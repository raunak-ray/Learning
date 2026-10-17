import { Pool } from "pg";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { AppError } from "@/utils/AppError";
import { logger } from "@/utils/logger";
import * as schema from "./schema/index";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
	throw new AppError("DB_URL is missing from environment variables");
}

export const client = new Pool({
	connectionString: DB_URL,
});

// Handle errors from idle pooled connections.
client.on("error", (error: Error) => {
	const pgError = error as Error & {
		code?: string;
		severity?: string;
	};

	logger.error(
		{
			message: pgError.message,
			code: pgError.code,
			severity: pgError.severity,
		},
		"Unexpected error on idle PostgreSQL connection",
	);
});

export const db = drizzle(client, { schema });

export async function connectDB(): Promise<void> {
	try {
		// Verify that PostgreSQL is reachable
		const connection = await client.connect();

		await connection.query("SELECT 1");
		connection.release();

		logger.info("PostgreSQL connected successfully");
	} catch (error) {
		logger.error({ err: error }, "Failed to connect to PostgreSQL");

		throw new AppError("Database connection failed");
	}
}
