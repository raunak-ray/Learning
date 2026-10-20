CREATE TYPE "public"."otp_purpose" AS ENUM('verify_email', 'reset_password');--> statement-breakpoint
CREATE TABLE "tbl_user_otp" (
	"id" serial PRIMARY KEY NOT NULL,
	"code_hash" varchar(255) NOT NULL,
	"user_id" integer,
	"expires_at" timestamp with time zone NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"purpose" "otp_purpose" DEFAULT 'verify_email' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tbl_users" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tbl_user_otp" ADD CONSTRAINT "tbl_user_otp_user_id_tbl_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tbl_users"("id") ON DELETE cascade ON UPDATE no action;