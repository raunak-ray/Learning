import z from "zod";
import { OtpService } from "./otp.service";
import { OtpPurposeValues } from "@/db/schema";

export const createUserSchema = z.object({
  first_name: z
    .string()
    .min(3, "first_name should be 3 characters long")
    .max(100, "first_name must be less than 100 characters long"),
  middle_name: z
    .string()
    .min(3, "first_name should be 3 characters long")
    .max(100, "first_name must be less than 100 characters long")
    .optional(),
  last_name: z
    .string()
    .min(3, "first_name should be 3 characters long")
    .max(100, "first_name must be less than 100 characters long"),
  email: z.email(),
  password: z
    .string()
    .min(8, "password must be atleast 8 characters")
    .max(50, "password must be less than 50 characters")
    .regex(/[a-z]/, "password must contain atleast one lowercase character")
    .regex(/[A-Z]/, "password must contain atleast one uppercase character")
    .regex(/[0-9]/, "password must contain atleast one number")
    .regex(/[!@#$%^&*]/, "password must contain atleast one special character"),
});

export const loginUserSchema = z.object({
  email: z.email(),

  password: z.string().min(8, "password must be atleast 8 characters"),
});

export const verifyUserOtp = z.object({
  purpose: z.enum(OtpPurposeValues).default("verify_email"),

  otp: z.string(),
});

export const findUserByIdSchema = z.object({
  id: z.coerce.number(),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
export type LoginUserType = z.infer<typeof loginUserSchema>;
export type VerifyUserOtpType = z.infer<typeof verifyUserOtp>;
export type FindUserByIdType = z.infer<typeof findUserByIdSchema>;
