import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import SignIn from "@/components/SignIn";

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

const page = async () => {
  const user = await getUser();

  if (!user) {
    return <SignIn />;
  }

  return <div>page</div>;
};

export default page;
