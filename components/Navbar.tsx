"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";

declare global {
  interface Window {
    google?: any;
  }
}

export default function Navbar({ user }: any) {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
  };

  useEffect(() => {
    if (user) return;

    const loadGoogle = () => {
      if (!window.google || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: any) => {
          const res = await fetch("/api/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential }),
          });

          if (res.ok) {
            router.refresh();
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "medium",
        type: "standard",
      });
    };

    if (window.google) {
      loadGoogle();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = loadGoogle;
      document.body.appendChild(script);
    }
  }, [user, router]);

  return (
    <nav className="font-sans flex items-center justify-between p-4 border-b-[3px] border-black">
      <Link href="/" className="flex items-center gap-1">
        <h1 className="text-[27.19px] font-medium uppercase">
          descend
          <span className="text-[#ff0000]">up</span>
        </h1>
      </Link>
      <div className="flex gap-4">
        <Button
          text="ANALYSE MY CHANNEL"
          color="blue"
          onClick={() => router.push("/dashboard")}
          textStyle="text-[10.62px] text-white"
        />
        {user ? (
          <Button
            text="LOGOUT"
            onClick={logout}
            textStyle="text-[10.62px] text-white"
          />
        ) : (
          <div ref={buttonRef}></div>
        )}
      </div>
    </nav>
  );
}
