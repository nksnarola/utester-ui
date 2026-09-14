import { HeroBackground } from "./home/components/HeroBackground"
import { HeroHeader } from "./home/components/HeroHeader"
import { HeroShowcaseCard } from "./home/components/HeroShowcaseCard"
import { FeaturePillars } from "./home/components/FeaturePillars"
import { HeroMetrics } from "./home/components/HeroMetrics"

/**
 * Modern, minimalist Landing/Home page for UTester.
 * Composes focused subcomponents:
 * - HeroBackground: Ambient radial glow & grid patterns
 * - HeroHeader: Headline, value proposition, CTAs, and trust pills
 * - HeroShowcaseCard: Interactive 3D terminal with physics-damped tilt & ambient float
 * - FeaturePillars: Core platform capabilities
 * - HeroMetrics: High-conversion social proof metrics
 */
export function HomePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <HeroBackground />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8">
        <HeroHeader />
        <HeroShowcaseCard />
        <FeaturePillars />
        <HeroMetrics />
      </div>
    </div>
  )
}
