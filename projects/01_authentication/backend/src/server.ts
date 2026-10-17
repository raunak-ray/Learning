import "dotenv/config";
import app from "./app";
import { connectDB } from "./db/config";
import { logger } from "./utils/logger";

const PORT = Number(process.env.PORT) || 5000;

async function startServer(): Promise<void> {
	try {
		await connectDB();

		app.listen(PORT, () => {
			logger.info(`Server started on port: ${PORT}`);
		});
	} catch (error) {
		logger.fatal({ err: error }, "Failed to start server");
		process.exit(1);
	}
}

startServer();
