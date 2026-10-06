import { z } from "zod";
import { TASK_STATUS } from "./constant.js";

export const getTasksSchema = z
  .object({
    page: z.coerce
      .number("Page must be a number")
      .int("Page must be an integer")
      .min(1, "Page must be at least 1")
      .optional(),

    limit: z.coerce
      .number("Limit must be a number")
      .int("Limit must be an integer")
      .min(10, "Limit must be at least 10")
      .max(100, "Limit cannot exceed 100")
      .optional(),

    cursor: z.coerce
      .number("Cursor must be a number")
      .int("Cursor must be an integer")
      .min(0, "Cursor cannot be negative")
      .optional(),

    useCursor: z
      .string()
      .refine(
        (value) => value === "true" || value === "false",
        "useCursor must be either true or false",
      )
      .transform((value) => value === "true")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.useCursor === true) {
        return data.cursor !== undefined;
      }

      return true;
    },
    {
      error: "Cursor is required when useCursor is true",
      path: ["cursor"],
    },
  );

export const getTaskSchema = z.object({
  id: z.coerce
    .number("ID must be a number")
    .int("ID must be an integer")
    .positive("ID must be greater than 0"),
});

export const createTaskSchema = z.object({
  title: z.string("Title must be a non-empty string").nonempty(),
  description: z.string("Description must be a string").optional(),
});

export const updateTaskSchema = z.object({
  title: z.string("Title must be a non-empty string").nonempty().optional(),
  description: z.string("Description must be a string").optional(),
  status: z.enum(
    [...TASK_STATUS],
    `Status can only be one of the following values: ${TASK_STATUS.join(", ")}`,
  ),
});

export const updateTaskParamsSchema = z.object({
  id: z.coerce
    .number("ID must be a number")
    .int("ID must be an integer")
    .positive("ID must be greater than 0"),
});

export const deleteTaskSchema = z.object({
  id: z.coerce
    .number("ID must be a number")
    .int("ID must be an integer")
    .positive("ID must be greater than 0"),
});
