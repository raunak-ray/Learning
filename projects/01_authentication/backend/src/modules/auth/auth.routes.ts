import express from "express";
import { validate } from "@/middleware/validation.middleware";
import { AuthController } from "./auth.controller";
import { createUserSchema, loginUserSchema, verifyUserOtp } from "./auth.schema";
import { authMiddleware } from "@/middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController();

router.post("/register", validate(createUserSchema), authController.create);
router.post("/login", validate(loginUserSchema), authController.login);
router.post("/verify", authMiddleware, validate(verifyUserOtp), authController.verify);
router.get("/me", authMiddleware, authController.profile);

export default router;
