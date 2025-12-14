"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { ConsoleNav } from "@/components/console/nav"
import { ConsoleSidebar } from "@/components/console/sidebar"
import { Loader2 } from "lucide-react"

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ConsoleSidebar />
      <div className="flex flex-1 flex-col">
        <ConsoleNav />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
