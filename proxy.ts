import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jwtVerify(token, secret);

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_PRO_URL}/dashboard`, req.url),
    );
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/"],
};
