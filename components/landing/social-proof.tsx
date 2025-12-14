import { Play } from "lucide-react"

const stats = [
  { value: "10K+", label: "Active Creators" },
  { value: "50M+", label: "Videos Analyzed" },
  { value: "2.5B+", label: "Views Tracked" },
]

export function LandingSocialProof() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by modern creators and growth-focused channels
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-foreground sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                <Play className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Creator {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
