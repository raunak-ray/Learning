import { DrizzleQueryError, eq } from "drizzle-orm";
import { db } from "@/db/config";
import { User } from "@/db/schema";
import { ConflictError } from "@/utils/AppError";
import type { CreateUserType } from "./auth.schema";

export class AuthRepository {
  private readonly responseClause = {
    id: User.id,
    firstName: User.first_name,
    middleName: User.middle_name,
    lastName: User.last_name,
    email: User.email,
    status: User.status,
    createdAt: User.created_at,
  };

  public async create(input: CreateUserType) {
    try {
      const [user] = await db
        .insert(User)
        .values({
          first_name: input.first_name,
          middle_name: input.middle_name ?? null,
          last_name: input.last_name,
          email: input.email,
          password: input.password,
        })
        .returning(this.responseClause);

      return user;
    } catch (error: unknown) {
      if (error instanceof DrizzleQueryError) {
        const pgError = error.cause as
          { code?: string; constraint?: string } | undefined;

        if (
          pgError?.code === "23505" &&
          pgError.constraint === "tbl_users_email_unique"
        ) {
          throw new ConflictError(
            "An account with this email address already exists.",
          );
        }
      }

      throw error;
    }
  }

  public async findAll() {
    const user = await db.select().from(User);

    return user;
  }

  public async findById(id: number) {
    const [user] = await db
      .select({
        ...this.responseClause,
        updatedAt: User.updated_at,
      })
      .from(User)
      .where(eq(User.id, id))
      .limit(1);

    return user;
  }

  public async findByEmail(email: string) {
    const [user] = await db
      .select(this.responseClause)
      .from(User)
      .where(eq(User.email, email))
      .limit(1);

    return user;
  }

  public async findByEmailWithPassword(email: string) {
    const [user] = await db
      .select({
        ...this.responseClause,
        password: User.password,
      })
      .from(User)
      .where(eq(User.email, email))
      .limit(1);

    return user;
  }

  public async updateStatus(id: number) {
    const [user] = await db
      .update(User)
      .set({
        status: "verified",
      })
      .where(eq(User.id, id))
      .returning(this.responseClause);

    return user;
  }

  public update() {}

  public delete() {}
}
