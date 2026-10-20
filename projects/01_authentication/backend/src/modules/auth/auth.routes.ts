import express from "express";
import { validate } from "@/middleware/validation.middleware";
import { AuthController } from "./auth.controller";
import { createUserSchema, loginUserSchema } from "./auth.schema";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController();

router.post("/register", validate(createUserSchema), authController.create);
router.post("/login", validate(loginUserSchema), authController.login);
router.get("/me", authMiddleware, authController.profile);

export default router;
