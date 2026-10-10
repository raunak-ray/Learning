import type { Request, Response } from "express";
import { successResponse } from "../../utils/responseHelpers.js";
import * as authService from "./auth.service.js";

export const register = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await authService.registerUser(body);

  return successResponse(res, "User registered successfully", 201, data);
};
