import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("tbl_users", {
  id: serial("id").primaryKey(),

  firstName: varchar("first_name", { length: 50 }).notNull(),

  middleName: varchar("middle_name", { length: 50 }),

  lastName: varchar("last_name", { length: 50 }).notNull(),

  email: varchar("email", { length: 255 }).notNull(),

  password: varchar("password", {length: 255}).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
