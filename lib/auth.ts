import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser() {
  const cookieStore = await cookies(); // ✅ FIX HERE

  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    if (!payload?.id || typeof payload.id !== "string") return null;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.id))
      .limit(1);

    return user[0] || null;
  } catch {
    return null;
  }
}
