"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ user }: any) {
  const router = useRouter();

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

  const signInWithGoogle = () => {
    window.location.href = "/api/auth/google/login";
  };

  return (
    <nav className="bg-white z-50 font-sans flex items-center justify-between p-4 border-b-[3px] border-black">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.svg" alt="DescendUp Logo" width={163} height={32} />
      </Link>

      <ul className="flex gap-8 list-none">
        {["The Flow", "Core Features", "Early Access Program", "FAQ"].map(
          (item) => (
            <li key={item}>
              <a
                href={`/#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase().replace(/ /g, "-"));
                }}
                className="text-[16px] tracking-widest uppercase text-black no-underline hover:text-red-600 transition-colors cursor-pointer"
              >
                {item}
              </a>
            </li>
          ),
        )}
        <li>
          <a
            href="/pricing"
            className="text-[16px] tracking-widest uppercase text-black no-underline hover:text-red-600 transition-colors cursor-pointer"
          >
            Pricing
          </a>
        </li>
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
          <Button
            text="GO TO CONSOLE"
            onClick={signInWithGoogle}
            textStyle="text-[10.62px] text-white"
          />
        )}
      </div>
    </nav>
  );
}
