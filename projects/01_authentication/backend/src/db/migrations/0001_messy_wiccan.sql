CREATE TYPE "public"."user_status" AS ENUM('unverified', 'verified');--> statement-breakpoint
ALTER TABLE "tbl_users" ADD COLUMN "status" "user_status" DEFAULT 'unverified';