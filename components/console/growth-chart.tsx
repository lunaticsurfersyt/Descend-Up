"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Dec 1", views: 45000, subscribers: 120 },
  { date: "Dec 5", views: 52000, subscribers: 145 },
  { date: "Dec 10", views: 61000, subscribers: 180 },
  { date: "Dec 15", views: 58000, subscribers: 165 },
  { date: "Dec 20", views: 72000, subscribers: 210 },
  { date: "Dec 25", views: 85000, subscribers: 280 },
  { date: "Dec 30", views: 92000, subscribers: 320 },
]

export function GrowthChart() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Channel Growth (Last 30 Days)</h3>
        <p className="text-sm text-muted-foreground">Views and subscriber growth over time</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.25 280)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.25 280)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="subsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.70 0.20 200)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.70 0.20 200)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 285)" />
            <XAxis dataKey="date" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} />
            <YAxis stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} yAxisId="left" />
            <YAxis stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} yAxisId="right" orientation="right" />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.17 0.01 285)",
                border: "1px solid oklch(0.28 0.02 285)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "oklch(0.97 0 0)" }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="views"
              stroke="oklch(0.65 0.25 280)"
              fill="url(#viewsGradient)"
              strokeWidth={2}
              yAxisId="left"
              name="Views"
            />
            <Area
              type="monotone"
              dataKey="subscribers"
              stroke="oklch(0.70 0.20 200)"
              fill="url(#subsGradient)"
              strokeWidth={2}
              yAxisId="right"
              name="New Subscribers"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
