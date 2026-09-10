import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent mb-6">
          Next-Gen Quality Engineering
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl md:text-6xl">
          Automated Testing, <span className="text-accent">Simplified.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-muted">
          Enterprise test case management, automated test execution, and real-time failure analysis designed for high-velocity teams.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register">
            <Button variant="default" size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          "Intuitive Test Authoring",
          "Automated Test Execution",
          "Comprehensive Analytics",
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm"
          >
            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
            <span className="text-sm font-medium text-text">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
