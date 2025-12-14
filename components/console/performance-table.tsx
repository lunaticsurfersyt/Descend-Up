import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown } from "lucide-react"

const videos = [
  {
    title: "How to 10x Your YouTube Views in 2024",
    views: "245K",
    ctr: "8.2%",
    avgDuration: "12:34",
    revenue: "$1,240",
    trend: "up",
  },
  {
    title: "The TRUTH About YouTube Algorithm",
    views: "189K",
    ctr: "6.8%",
    avgDuration: "15:22",
    revenue: "$945",
    trend: "up",
  },
  {
    title: "5 Mistakes New YouTubers Make",
    views: "156K",
    ctr: "5.4%",
    avgDuration: "08:45",
    revenue: "$782",
    trend: "down",
  },
  {
    title: "Best Camera for YouTube 2024",
    views: "134K",
    ctr: "7.1%",
    avgDuration: "18:20",
    revenue: "$672",
    trend: "up",
  },
  {
    title: "YouTube Shorts vs Long Form Content",
    views: "98K",
    ctr: "4.9%",
    avgDuration: "10:15",
    revenue: "$490",
    trend: "down",
  },
]

export function PerformanceTable() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Top Performing Videos</h3>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground">Video Title</TableHead>
            <TableHead className="text-right text-muted-foreground">Views</TableHead>
            <TableHead className="text-right text-muted-foreground">CTR</TableHead>
            <TableHead className="text-right text-muted-foreground">Avg. Duration</TableHead>
            <TableHead className="text-right text-muted-foreground">Revenue</TableHead>
            <TableHead className="text-right text-muted-foreground">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.title} className="border-border">
              <TableCell className="font-medium text-foreground">{video.title}</TableCell>
              <TableCell className="text-right text-foreground">{video.views}</TableCell>
              <TableCell className="text-right text-foreground">{video.ctr}</TableCell>
              <TableCell className="text-right text-foreground">{video.avgDuration}</TableCell>
              <TableCell className="text-right text-foreground">{video.revenue}</TableCell>
              <TableCell className="text-right">
                {video.trend === "up" ? (
                  <TrendingUp className="ml-auto h-4 w-4 text-neon-green" />
                ) : (
                  <TrendingDown className="ml-auto h-4 w-4 text-destructive-foreground" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
