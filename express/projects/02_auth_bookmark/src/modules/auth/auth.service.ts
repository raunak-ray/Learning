import { db } from "../../db/config.js";
import { User } from "../../db/schema/users.schema.js";
import { generateTokenPair, hashPassword } from "./auth.helpers.js";
import type { RegisterUserType } from "./auth.schema.js";

export const registerUser = async (input: RegisterUserType) => {
  const passwordHash = await hashPassword(input.password);

  const [user] = await db
    .insert(User)
    .values({
      firstName: input.first_name,
      middleName: input.middle_name ?? null,
      lastName: input.last_name,
      email: input.email,
      password: passwordHash,
    })
    .returning();

  if (!user) {
    throw new Error("Error creating user");
  }

  const tokens = generateTokenPair({
    sub: user.id,
    email: user?.email,
  });

  return { ...user, ...tokens };
};
