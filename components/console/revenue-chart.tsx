"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jul", ads: 1200, memberships: 300, superchats: 150 },
  { month: "Aug", ads: 1400, memberships: 350, superchats: 180 },
  { month: "Sep", ads: 1600, memberships: 400, superchats: 220 },
  { month: "Oct", ads: 1800, memberships: 450, superchats: 260 },
  { month: "Nov", ads: 2100, memberships: 520, superchats: 310 },
  { month: "Dec", ads: 2400, memberships: 600, superchats: 380 },
]

export function RevenueChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Breakdown</h3>
        <p className="text-sm text-muted-foreground">Revenue sources over the last 6 months</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 285)" />
            <XAxis dataKey="month" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} />
            <YAxis stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.17 0.01 285)",
                border: "1px solid oklch(0.28 0.02 285)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "oklch(0.97 0 0)" }}
            />
            <Legend />
            <Bar dataKey="ads" fill="oklch(0.65 0.25 280)" radius={[4, 4, 0, 0]} name="Ad Revenue" />
            <Bar dataKey="memberships" fill="oklch(0.70 0.20 200)" radius={[4, 4, 0, 0]} name="Memberships" />
            <Bar dataKey="superchats" fill="oklch(0.75 0.20 145)" radius={[4, 4, 0, 0]} name="Super Chats" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
