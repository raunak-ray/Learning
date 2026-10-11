import z from "zod";

export const RegisterUserSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters long")
    .max(50, "First name must be less than 50 characters long"),

  middle_name: z
    .string()
    .trim()
    .min(3, "Middle name must be at least 3 characters long")
    .max(50, "Middle name must be less than 50 characters long")
    .nullable()
    .optional(),

  last_name: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters long")
    .max(50, "Last name must be less than 50 characters long"),

  email: z.email("Email must be a valid email address"),

  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be less than 20 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least one special character: !@#$%^&*",
    ),
});

export const LoginUserSchema = z.object({
  email: z.email("Email must be a valid email address"),

  password: z.string().trim().min(1, "Password must be at least 1 characters long"),
});

export const UpdateUserSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(3, "First name must be at least 3 characters")
      .max(50, "First name must be 50 characters or fewer")
      .optional(),

    middle_name: z
      .string()
      .trim()
      .min(3, "Middle name must be at least 3 characters")
      .max(50, "Middle name must be 50 characters or fewer")
      .optional()
      .nullable(),

    last_name: z
      .string()
      .trim()
      .min(3, "Last name must be at least 3 characters")
      .max(50, "Last name must be 50 characters or fewer")
      .optional(),
  })
  .refine(
    (value) => {
      if (!value.first_name && !value.middle_name && !value.last_name) {
        return false;
      }
      return true;
    },
    {
      path: ["first_name"],
      error: "Provide at least one field to update",
    },
  );

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
