import {
  AppError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/AppError";
import {
  generateTokenPairs,
  generateUUID,
  hashPassword,
  verifyHashPassword,
} from "./auth.helpers";
import { AuthRepository } from "./auth.repository";
import type { CreateUserType, LoginUserType, VerifyUserOtpType } from "./auth.schema";
import { OtpService } from "./otp.service";

export class AuthService {
  constructor(
    private readonly authRepository = new AuthRepository(),
    private readonly otpService = new OtpService(),
  ) {}

  public async createUser(input: CreateUserType) {
    const existingUser = await this.authRepository.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictError(
        "An account with this email address already exists.",
      );
    }

    const passwordHash = await hashPassword(input.password);

    const user = await this.authRepository.create({
      ...input,
      password: passwordHash,
    });

    const jti = generateUUID();

    const tokens = generateTokenPairs({
      sub: user.id,
      email: user.email,
      jti,
    });

    const otp = await this.otpService.generateOtp(user.id);

    return { ...user, ...tokens, ...otp };
  }

  public async loginUser(input: LoginUserType) {
    const user = await this.authRepository.findByEmailWithPassword(input.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (user.status !== "verified") {
      throw new UnauthorizedError("Verify your email first to login");
    }

    const isPasswordMatched = await verifyHashPassword(
      input.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const jti = generateUUID();

    const tokens = generateTokenPairs({
      sub: user.id,
      email: user.email,
      jti,
    });

    return { ...user, password: undefined, ...tokens };
  }

  public async getProfile(id: number) {
    const user = await this.authRepository.findById(id);

    if (!user || user.status !== "verified") {
      throw new NotFoundError("User profile not found");
    }

    return user;
  }

  public async verifyEmail(userId: number, input: VerifyUserOtpType) {
    const user = await this.authRepository.findById(userId);

    if (user.status === "verified") {
      throw new BadRequestError("Email already verified");
    }

    await this.otpService.verifyOtp(userId, input.otp, input.purpose);

    const updatedUser = await this.authRepository.updateStatus(userId);

    return updatedUser;
  }
}
