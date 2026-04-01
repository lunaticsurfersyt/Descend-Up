"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
    <nav className="bg-white z-50 font-sans flex items-center justify-between p-4 border-b-[3px] border-black">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.svg" alt="DescendUp Logo" width={163} height={32} />
      </Link>
      <ul className="flex gap-12 list-none">
        {["The Flow", "Core Features", "Early Access Program", "FAQ"].map(
          (item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase().replace(/ /g, "-"));
                }}
                className="text-[18px] tracking-widest uppercase text-black no-underline hover:text-red-600 transition-colors cursor-pointer"
              >
                {item}
              </a>
            </li>
          ),
        )}
      </ul>
      <div className="flex gap-4">
        <Button
          text="ANALYSE MY CHANNEL"
          color="blue"
          onClick={() => router.push("/analyse")}
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
