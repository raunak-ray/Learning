import { randomInt } from "node:crypto";
import {
  and,
  eq,
  gt,
} from "drizzle-orm";

import { hashPassword, verifyHashPassword } from "./auth.helpers";
import { db } from "@/db/config";
import { UserOtp } from "@/db/schema";
import { UnauthorizedError } from "@/utils/AppError";

export type OtpPurpose = "verify_email" | "reset_password";

export class OtpService {
  private readonly MAX_VALID_OTP_TIME = 5 * 60 * 1000;
  private readonly MAX_ATTEMPTS = 5;

  public async generateOtp(
    userId: number,
    purpose: OtpPurpose = "verify_email",
  ) {
    const otp = randomInt(100000, 1000000).toString();
    const otpHash = await hashPassword(otp);

    const expiresAt = new Date(
      Date.now() + this.MAX_VALID_OTP_TIME,
    );

    await db.insert(UserOtp).values({
      code_hash: otpHash,
      expires_at: expiresAt,
      user_id: userId,
      purpose,
      attempts: 0,
      is_consumed: false,
    });

    // Return the OTP for email delivery or development testing.
    // Never return it to clients in production.
    return { otp };
  }

  public async verifyOtp(
    userId: number,
    otp: string,
    purpose: OtpPurpose = "verify_email",
  ): Promise<boolean> {
    const [userOtp] = await db
      .select()
      .from(UserOtp)
      .where(
        and(
          eq(UserOtp.user_id, userId),
          eq(UserOtp.purpose, purpose),
          gt(UserOtp.expires_at, new Date()),
          eq(UserOtp.is_consumed, false),
        ),
      )
      .limit(1);

    if (!userOtp || userOtp.attempts >= this.MAX_ATTEMPTS) {
      throw new UnauthorizedError("Invalid or expired OTP");
    }

    const isOtpVerified = await verifyHashPassword(
      otp,
      userOtp.code_hash,
    );

    if (!isOtpVerified) {
      await db
        .update(UserOtp)
        .set({
          attempts: userOtp.attempts + 1,
        })
        .where(
          and(
            eq(UserOtp.id, userOtp.id),
            eq(UserOtp.is_consumed, false),
          ),
        );

      throw new UnauthorizedError("Invalid or expired OTP");
    }

    await db
      .update(UserOtp)
      .set({
        is_consumed: true,
      })
      .where(
        and(
          eq(UserOtp.id, userOtp.id),
          eq(UserOtp.is_consumed, false),
          gt(UserOtp.expires_at, new Date()),
        ),
      );

    return true;
  }
}
