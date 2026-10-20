import express from "express";
import { validate } from "@/middleware/validation.middleware";
import { AuthController } from "./auth.controller";
import { createUserSchema, loginUserSchema } from "./auth.schema";

const router = express.Router();

const authController = new AuthController();

router.post("/register", validate(createUserSchema), authController.create);
router.post("/login", validate(loginUserSchema), authController.login);

export default router;
