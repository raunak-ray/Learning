import type { Request, Response } from "express";
import { successResponse } from "@/utils/responseHelpers";
import { AuthService } from "./auth.service";

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
}
