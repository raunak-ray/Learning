import pino from "pino";
import "dotenv/config";

export const logger = pino({
	level: process.env.LOG_LEVEL ?? "info",
	redact: {
		paths: ["req.headers.authorization", "password", "token"],
		censor: "[REDACTED]",
	},

	transport:
		process.env.NODE_ENV !== "production"
			? {
					target: "pino-pretty",
					options: {
						colorize: true,
						translateTime: "SYS:standard",
						ignore: "pid,hostname",
					},
				}
			: undefined,
});
