import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Terminal } from "lucide-react"

export function HeroHeader() {
  return (
    <div className="text-center">
      {/* Top Header Announcement Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-text shadow-xs backdrop-blur-md transition-all hover:border-accent/40">
          <Sparkles
            className="h-3.5 w-3.5 text-accent animate-spin"
            style={{ animationDuration: "8s" }}
          />
          <span>UTester 2.0 is Live</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
          <span className="text-accent">Explore Autonomous QA</span>
          <ArrowRight className="h-3 w-3 text-muted" />
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl">
        Automated Testing,{" "}
        <span className="bg-gradient-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent">
          Engineered for Speed.
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted font-normal leading-relaxed">
        Eliminate flaky tests, orchestrate lightning-fast cloud executions, and ship rock-solid software with an intelligent testing platform built for modern engineering teams.
      </p>

      {/* Action CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/register" className="w-full sm:w-auto">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto gap-2 px-8 shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all hover:scale-[1.02]"
          >
            Start Testing Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/login" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2 px-6 border-border hover:bg-secondary transition-all"
          >
            <Terminal className="h-4 w-4 text-muted" />
            Live Workspace Demo
          </Button>
        </Link>
      </div>

      {/* Feature Highlights Trust Pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          Zero-configuration setup
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          Native CI/CD webhooks
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-accent" />
          Enterprise-grade SOC2 certified
        </span>
      </div>
    </div>
  )
}
