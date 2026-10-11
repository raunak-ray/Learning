import { eq } from "drizzle-orm";
import { db } from "../../db/config.js";
import { User } from "../../db/schema/users.schema.js";
import type { RegisterUserType, UpdateUserType } from "./auth.schema.js";

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

export const updateUser = async (id: number, input: UpdateUserType) => {
  const [user] = await db.update(User).set({
    firstName: input.first_name,
    middleName: input.middle_name,
    lastName: input.last_name,
    updatedAt: new Date()
  }).where(eq(User.id, id)).returning();

  return user;
}
