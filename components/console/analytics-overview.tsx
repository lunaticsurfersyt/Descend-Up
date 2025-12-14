"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const viewsData = [
  { date: "Week 1", value: 125000 },
  { date: "Week 2", value: 142000 },
  { date: "Week 3", value: 138000 },
  { date: "Week 4", value: 165000 },
]

const ctrData = [
  { date: "Week 1", value: 4.2 },
  { date: "Week 2", value: 4.5 },
  { date: "Week 3", value: 4.8 },
  { date: "Week 4", value: 5.1 },
]

const impressionsData = [
  { date: "Week 1", value: 2800000 },
  { date: "Week 2", value: 3100000 },
  { date: "Week 3", value: 2900000 },
  { date: "Week 4", value: 3400000 },
]

export function AnalyticsOverview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Tabs defaultValue="views" className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-foreground">Performance Overview</h3>
          <TabsList className="bg-secondary">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="ctr">CTR</TabsTrigger>
            <TabsTrigger value="impressions">Impressions</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="views" className="mt-0">
          <ChartDisplay data={viewsData} label="Views" color="oklch(0.65 0.25 280)" />
        </TabsContent>
        <TabsContent value="ctr" className="mt-0">
          <ChartDisplay data={ctrData} label="CTR %" color="oklch(0.70 0.20 200)" suffix="%" />
        </TabsContent>
        <TabsContent value="impressions" className="mt-0">
          <ChartDisplay data={impressionsData} label="Impressions" color="oklch(0.75 0.20 145)" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ChartDisplay({
  data,
  label,
  color,
  suffix = "",
}: {
  data: { date: string; value: number }[]
  label: string
  color: string
  suffix?: string
}) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 285)" />
          <XAxis dataKey="date" stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} />
          <YAxis stroke="oklch(0.65 0 0)" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.17 0.01 285)",
              border: "1px solid oklch(0.28 0.02 285)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "oklch(0.97 0 0)" }}
            formatter={(value: number) => [`${value.toLocaleString()}${suffix}`, label]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
