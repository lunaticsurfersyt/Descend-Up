"use client"

import { StatCard } from "@/components/console/stat-card"
import { GrowthChart } from "@/components/console/growth-chart"
import { RevenueChart } from "@/components/console/revenue-chart"
import { Eye, Clock, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Views",
    value: "2.4M",
    change: "+12.5%",
    trend: "up" as const,
    icon: Eye,
  },
  {
    title: "Watch Time",
    value: "148K hrs",
    change: "+8.2%",
    trend: "up" as const,
    icon: Clock,
  },
  {
    title: "Subscribers",
    value: "124,500",
    change: "+15.3%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Est. Revenue",
    value: "$8,420",
    change: "+22.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
]

export default function ConsoleDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your channel overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GrowthChart />
        <RevenueChart />
      </div>
    </div>
  )
}
