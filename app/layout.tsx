import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "DescendUp",
  description:
    "A platform for creators to monetize their content through NFTs and subscriptions.",
};

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  console.log("User in layout:", user);

  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${syne.variable} antialiased`}
      >
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
