"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  channelName?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const publicRoutes = ["/", "/pricing", "/login", "/signup"]
const authRoutes = ["/login", "/signup"]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const storedUser = localStorage.getItem("tube_growth_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const isProtectedRoute = pathname.startsWith("/console")
    const isAuthRoute = authRoutes.includes(pathname)

    if (!user && isProtectedRoute) {
      router.push("/")
    } else if (user && isAuthRoute) {
      router.push("/console")
    }
  }, [user, pathname, isLoading, router])

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockUser: User = {
      id: "1",
      name: "Alex Creator",
      email,
      avatar: "/creator-avatar.png",
      channelName: "TechWithAlex",
    }
    setUser(mockUser)
    localStorage.setItem("tube_growth_user", JSON.stringify(mockUser))
    router.push("/console")
  }

  const signup = async (name: string, email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockUser: User = {
      id: "1",
      name,
      email,
      channelName: "My Channel",
    }
    setUser(mockUser)
    localStorage.setItem("tube_growth_user", JSON.stringify(mockUser))
    router.push("/console")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("tube_growth_user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
