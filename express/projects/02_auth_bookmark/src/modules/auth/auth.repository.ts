import { eq } from "drizzle-orm";
import { db } from "../../db/config.js";
import { User } from "../../db/schema/users.schema.js";
import type { RegisterUserType } from "./auth.schema.js";

export const createUser = async (input: RegisterUserType) => {
  const [user] = await db
    .insert(User)
    .values({
      firstName: input.first_name,
      middleName: input.middle_name ?? null,
      lastName: input.last_name,
      email: input.email,
      password: input.password,
    })
    .returning();

  if (!user) {
    throw new Error("Insert returned no row");
  }

  return user;
};

export const findUserById = async (id: number) => {
  const [user] = await db.select().from(User).where(eq(User.id, id)).limit(1);

  return user ?? null;
};

export const findUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(User)
    .where(eq(User.email, email))
    .limit(1);

  return user ?? null;
};
