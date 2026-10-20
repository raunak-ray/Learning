import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { User } from "./user.schema";
import { pgEnum } from "drizzle-orm/pg-core";

export const OtpPurposeValues = ["verify_email", "reset_password"] as const;

export const OtpPurpose = pgEnum("otp_purpose", OtpPurposeValues);

export const UserOtp = pgTable("tbl_user_otp", {
  id: serial().primaryKey(),
  code_hash: varchar({ length: 255 }).notNull(),
  user_id: integer().references(() => User.id, { onDelete: "cascade" }),
  expires_at: timestamp({ withTimezone: true }).notNull(),
  attempts: integer().default(0).notNull(),
  purpose: OtpPurpose().default("verify_email").notNull(),
  is_consumed: boolean().default(false).notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
