import type { Request, Response } from "express";
import { successResponse } from "../../utils/responseHelpers.js";
import * as authService from "./auth.service.js";
import { UnauthorizedError } from "../../utils/AppError.js";

export const register = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await authService.registerUser(body);

  return successResponse(res, "Registration successful", 201, data);
};

export const login = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await authService.loginUser(body);

  return successResponse(res, "Login successful", 200, data);
};

export const getMe = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new UnauthorizedError("Authentication required");
  }

  const data = await authService.getUserProfile(user.sub);

  return successResponse(res, "Profile fetched successfully", 200, data);
};
