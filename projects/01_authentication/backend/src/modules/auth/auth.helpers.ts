import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import "dotenv/config";

export const hashPassword = async (password: string) => {
	const SALT_ROUNDS = 10;
	return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyHashPassword = async (
	password: string,
	hashPassword: string,
) => {
	return await bcrypt.compare(password, hashPassword);
};

export type JWTPayload = {
	sub: number;
	email: string;
	jti: string;
};

export const generateToken = (
	payload: JWTPayload,
	type: "access" | "refresh" = "access",
) => {
	switch (type) {
		case "access": {
			const accessSecret = process.env.JWT_ACCESS_SECRET;
			const accessExpiry = process.env
				.JWT_ACCESS_EXPIRY as SignOptions["expiresIn"];

			if (!accessSecret || !accessExpiry) {
				throw new AppError("Access secret or expiry is missing");
			}

			return jwt.sign(payload, accessSecret, { expiresIn: accessExpiry });
		}

		case "refresh": {
			const refreshSecret = process.env.JWT_REFRESH_SECRET;
			const refreshExpiry = process.env
				.JWT_REFRESH_EXPIRY as SignOptions["expiresIn"];

			if (!refreshSecret || !refreshExpiry) {
				throw new AppError("Refresh secret key or expiry is missing");
			}

			return jwt.sign(payload, refreshSecret, { expiresIn: refreshExpiry });
		}
	}
};

export const generateTokenPairs = (payload: JWTPayload) => {
	const accessToken = generateToken(payload, "access");
	const refreshToken = generateToken(payload, "refresh");

	return { accessToken, refreshToken };
};

export const generateUUID = () => {
	return crypto.randomUUID();
};
