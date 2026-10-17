import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import "dotenv/config";
import { AppError } from "@/utils/AppError";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
	throw new AppError("DB_URL is missing from environment variables");
}

export default defineConfig({
	schema: "./src/db/schema/index.ts",
	out: "./src/db/migrations",
	dialect: "postgresql",
	verbose: true,
	casing: "snake_case",
	dbCredentials: {
		url: DB_URL,
	},
});
