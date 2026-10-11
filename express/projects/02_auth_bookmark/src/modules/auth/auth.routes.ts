import express from "express";
import * as authController from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import * as authSchema from "./auth.schema.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(authSchema.RegisterUserSchema, "body"),
  authController.register,
);

router.post(
  "/login",
  validate(authSchema.LoginUserSchema, "body"),
  authController.login,
);

router.get("/me", authMiddleware, authController.getMe);

router.patch(
  "/update",
  validate(authSchema.UpdateUserSchema),
  authMiddleware,
  authController.updateProfile,
);

export default router;
