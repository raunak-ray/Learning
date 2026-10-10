import z from "zod";

export const RegisterUserSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(50, "First name must be less than 50 characters long"),

  middle_name: z
    .string()
    .min(3, "Middle name must be at least 3 characters long")
    .max(50, "Middle name must be less than 50 characters long")
    .optional(),

  last_name: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .max(50, "Last name must be less than 50 characters long"),

  email: z.email("Email must be a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character: !@#$%^&*",
    ),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
