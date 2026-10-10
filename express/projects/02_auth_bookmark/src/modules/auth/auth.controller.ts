import type { Request, Response } from "express";
import { successResponse } from "../../utils/responseHelpers.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  return successResponse(res, "User registered successfully", 201, {
    name,
    email,
    password,
  });
};
