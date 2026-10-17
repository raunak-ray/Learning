import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("tbl_users", {
	id: serial().primaryKey(),
	first_name: varchar({ length: 100 }).notNull(),
	middle_name: varchar({ length: 100 }),
	last_name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 255 }).unique().notNull(),
	password: varchar({ length: 255 }).notNull(),
	created_at: timestamp({ withTimezone: true }).defaultNow(),
	updated_at: timestamp({ withTimezone: true }),
});
