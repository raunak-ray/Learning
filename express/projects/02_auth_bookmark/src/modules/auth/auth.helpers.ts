import bcrypt from "bcryptjs";
import type { JwtPayload, JwtTokenType } from "./auth.types.js";
import "dotenv/config";
import jwt, { type SignOptions } from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const hashPassword = async (
  password: string,
) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  storedPasswordHash: string,
) => {
  return await bcrypt.compare(password, storedPasswordHash);
};

// helpers
const getSecret = (type: JwtTokenType) => {
  const secret =
    type === "access"
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET;
  const expiresIn = (
    type === "access"
      ? process.env.JWT_ACCESS_EXPIRY
      : process.env.JWT_REFRESH_EXPIRY
  ) as SignOptions["expiresIn"];

  if (!secret || !expiresIn) {
    throw new Error(
      `Missing JWT_${type.toUpperCase()}_SECRET or JWT_${type.toUpperCase()}_EXPIRY`,
    );
  }

  return { secret, expiresIn };
};

const sign = (payload: JwtPayload, type: JwtTokenType) => {
  const { secret, expiresIn } = getSecret(type);
  return jwt.sign(payload, secret, { expiresIn });
};

// public API
export const generateAccessToken = (payload: JwtPayload) => {
  return sign(payload, "access");
};

export const generateRefreshToken = (payload: JwtPayload) => {
  return sign(payload, "refresh");
};

export const generateTokenPair = (payload: JwtPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
