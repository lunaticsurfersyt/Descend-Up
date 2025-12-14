import { LandingNav } from "@/components/landing/nav"
import { LandingPricing } from "@/components/landing/pricing"
import { LandingFooter } from "@/components/landing/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-16">
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  )
}
