import { LandingHero } from "@/components/landing/hero"
import { LandingFeatures } from "@/components/landing/features"
import { LandingSocialProof } from "@/components/landing/social-proof"
import { LandingPricing } from "@/components/landing/pricing"
import { LandingFooter } from "@/components/landing/footer"
import { LandingNav } from "@/components/landing/nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingSocialProof />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  )
}
