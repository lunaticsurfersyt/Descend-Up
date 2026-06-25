import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",

    domain:
      process.env.NODE_ENV === "production" ? ".descendup.com" : undefined,
  });

  return response;
}
