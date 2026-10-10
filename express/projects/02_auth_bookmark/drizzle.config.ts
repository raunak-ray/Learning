import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./src/db/migrate",
  schema: "./src/db/schema",
  dialect: "postgresql",
  
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
