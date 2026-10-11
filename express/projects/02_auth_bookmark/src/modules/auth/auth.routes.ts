import express from "express";
import * as authController from "./auth.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import * as authSchema from "./auth.schema.js";

const router = express.Router();

router.post("/register", validate(authSchema.RegisterUserSchema, "body") , authController.register);

export default router;