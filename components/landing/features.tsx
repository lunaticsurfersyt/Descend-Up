import { BarChart3, MessageSquare, Sliders } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "YouTube Analytics Dashboard",
    description: "Track views, watch time, subscribers, RPM, and income growth with beautiful visualizations.",
  },
  {
    icon: Sliders,
    title: "AI Video Optimization",
    description: "Optimize titles, descriptions, tags, and thumbnails before publishing for maximum reach.",
  },
  {
    icon: MessageSquare,
    title: "Trend-Aware AI Chatbot",
    description: "Ask questions about emerging trends tailored to your channel and get actionable insights.",
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to grow your channel
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Powerful tools designed specifically for YouTube creators who want to scale.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
