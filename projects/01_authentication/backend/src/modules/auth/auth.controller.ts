import type { Request, Response } from "express";
import { successResponse } from "@/utils/responseHelpers";
import { AuthService } from "./auth.service";
import { BadRequestError, UnauthorizedError } from "@/utils/AppError";

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  public create = async (req: Request, res: Response) => {
    const input = req.body;

    const data = await this.authService.createUser(input);

    return successResponse(res, {
      message: "User registered successfully",
      statusCode: 201,
      data,
    });
  };

  public login = async (req: Request, res: Response) => {
    const input = req.body;

    const data = await this.authService.loginUser(input);

    return successResponse(res, {
      message: "User logged in successfully",
      statusCode: 200,
      data,
    });
  };

  public profile = async (req: Request, res: Response) => {
    const id = req.user?.sub;

    if (id === undefined) {
      throw new UnauthorizedError("Authentication required for fetching profile data");
    }

    const data = await this.authService.getProfile(id);

    return successResponse(res, {
      message: "User profile fetched successfully",
      statusCode: 200,
      data,
    });
  };
}
