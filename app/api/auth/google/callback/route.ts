import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    // Get Google profile
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const profileRes = await oauth2.userinfo.get();
    const profile = profileRes.data;

    if (!profile.email || !profile.id) {
      return NextResponse.json(
        { error: "Could not get Google profile" },
        { status: 401 },
      );
    }

    // Get YouTube channel
    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const channelRes = await youtube.channels.list({
      mine: true,
      part: ["snippet"],
    });

    const channel = channelRes.data.items?.[0];

    // Find user
    let user = (
      await db
        .select()
        .from(users)
        .where(eq(users.googleId, profile.id))
        .limit(1)
    )[0];

    if (!user) {
      user = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, profile.email))
          .limit(1)
      )[0];
    }

    // Create user if needed
    if (!user) {
      const inserted = await db
        .insert(users)
        .values({
          email: profile.email,
          name: profile.name ?? null,
          image: profile.picture ?? null,
          googleId: profile.id,
          plan: "free",

          googleAccessToken: tokens.access_token ?? null,
          googleRefreshToken: tokens.refresh_token ?? null,
          googleTokenExpiresAt: tokens.expiry_date
            ? new Date(tokens.expiry_date)
            : null,

          youtubeChannelId: channel?.id ?? null,
          youtubeChannelTitle: channel?.snippet?.title ?? null,
          youtubeChannelThumbnail:
            channel?.snippet?.thumbnails?.high?.url ?? null,
        })
        .returning();

      user = inserted[0];
    } else {
      const updated = await db
        .update(users)
        .set({
          name: profile.name ?? null,
          image: profile.picture ?? null,
          googleId: profile.id,

          googleAccessToken: tokens.access_token ?? null,

          // Only overwrite if Google sends one
          googleRefreshToken: tokens.refresh_token ?? user.googleRefreshToken,

          googleTokenExpiresAt: tokens.expiry_date
            ? new Date(tokens.expiry_date)
            : null,

          youtubeChannelId: channel?.id ?? null,
          youtubeChannelTitle: channel?.snippet?.title ?? null,
          youtubeChannelThumbnail:
            channel?.snippet?.thumbnails?.high?.url ?? null,

          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))
        .returning();

      user = updated[0];
    }

    // Create session JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Redirect to app
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_PRO_URL}/dashboard`,
    );

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
    console.error(error);

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
