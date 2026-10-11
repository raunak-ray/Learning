import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/AppError.js";
import {
  comparePassword,
  generateTokenPair,
  hashPassword,
} from "./auth.helpers.js";
import type {
  LoginUserType,
  RegisterUserType,
  UpdateUserType,
} from "./auth.schema.js";
import * as authRepository from "./auth.repository.js";
import { User } from "../../db/schema/index.js";
import type { SafeUser, UserResponse } from "./auth.types.js";

const mapUser = (user: typeof User.$inferSelect): SafeUser => {
  return {
    id: user.id,
    first_name: user.firstName,
    middle_name: user.middleName,
    last_name: user.lastName,
    email: user.email,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
};

export const registerUser = async (
  input: RegisterUserType,
): Promise<UserResponse> => {
  const existingUser = await authRepository.findUserByEmail(input.email);

  if (existingUser) {
    throw new ConflictError("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await authRepository.createUser({
    ...input,
    password: passwordHash,
  });

  const tokens = generateTokenPair({
    sub: user.id,
    email: user.email,
  });

  return { ...mapUser(user), ...tokens };
};

export const loginUser = async (
  input: LoginUserType,
): Promise<UserResponse> => {
  const user = await authRepository.findUserByEmail(input.email);

  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(input.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const tokens = generateTokenPair({
    sub: user.id,
    email: user.email,
  });

  return { ...mapUser(user), ...tokens };
};

export const getUserProfile = async (id: number): Promise<SafeUser> => {
  const user = await authRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return mapUser(user);
};

export const updateUserProfile = async (
  id: number,
  input: UpdateUserType,
): Promise<SafeUser> => {
  const updatedUser = await authRepository.updateUser(id, input);

  if (!updatedUser) {
    throw new ConflictError("Failed to update user profile");
  }

  return mapUser(updatedUser);
};
