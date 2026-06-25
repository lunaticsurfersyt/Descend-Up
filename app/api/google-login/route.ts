import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { credential } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.sub) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 1. Find by googleId (preferred)
    let user = (
      await db
        .select()
        .from(users)
        .where(eq(users.googleId, payload.sub))
        .limit(1)
    )[0];

    // 2. Fallback to email (for existing users)
    if (!user) {
      user = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, payload.email))
          .limit(1)
      )[0];
    }

    // 3. Create user if first login
    if (!user) {
      const insertedUsers = await db
        .insert(users)
        .values({
          email: payload.email,
          name: payload.name ?? null,
          image: payload.picture ?? null,
          googleId: payload.sub,
        })
        .returning();

      user = insertedUsers[0];
    } else {
      // 4. Keep Google profile in sync
      const updatedUsers = await db
        .update(users)
        .set({
          name: payload.name ?? null,
          image: payload.picture ?? null,
          googleId: payload.sub,
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))
        .returning();

      user = updatedUsers[0];
    }

    // 5. JWT should only contain identity
    const sessionUser = {
      id: user.id,
      email: user.email,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT(sessionUser)
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      domain:
        process.env.NODE_ENV === "production" ? ".descendup.com" : undefined,
    });

    return response;
  } catch (error) {
    console.error("Google login error:", error);

    return NextResponse.json(
      {
        error: "Authentication failed",
      },
      {
        status: 401,
      },
    );
  }
}
