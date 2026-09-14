import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Activity,
  Terminal,
  Play,
} from "lucide-react"

/**
 * Modern, minimalist Hero page for UTester.
 * Features:
 * - Subtle ambient radial glows and grid pattern
 * - Continuous idle 3D Lissajous rotation that smoothly changes face direction
 * - Real-time pointer-tracking tilt when hovered with dynamic specular glare
 * - Floating 3D stereoscopic depth chips
 * - High-conversion CTAs and social proof metrics
 */
export function HomePage() {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ rotateX: 6, rotateY: -6, glareX: 50, glareY: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  /**
   * Subtle, continuous ambient 3D floating animation when no pointer is on the section.
   * Uses non-harmonic trigonometric Lissajous frequencies (0.75 and 0.5) so the card
   * gently and organically breathes in 3D space, continuously shifting its face direction.
   */
  useEffect(() => {
    if (isHovered) return

    let animationFrameId: number
    let startTimestamp: number | null = null
    const initialRotateX = tilt.rotateX
    const initialRotateY = tilt.rotateY
    const blendDuration = 1.0 // 1s smooth blend into the continuous cycle

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = (timestamp - startTimestamp) / 1000

      // Non-harmonic Lissajous cycle for natural, organic 3D rotation
      // rotateX oscillates smoothly between -2deg and +8deg
      const targetRotateX = 3 + Math.sin(elapsed * 0.75) * 5
      // rotateY oscillates smoothly between -8deg and +8deg
      const targetRotateY = Math.cos(elapsed * 0.5) * 8

      // Glare follows the rotation across the glass card
      const targetGlareX = 50 + Math.cos(elapsed * 0.5) * 22
      const targetGlareY = 50 + Math.sin(elapsed * 0.75) * 22

      // Ease into the cycle smoothly if resuming from pointer interaction
      const progress = Math.min(elapsed / blendDuration, 1)
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2 // easeInOut

      const currentRotateX = initialRotateX + (targetRotateX - initialRotateX) * ease
      const currentRotateY = initialRotateY + (targetRotateY - initialRotateY) * ease
      const currentGlareX = 50 + (targetGlareX - 50) * ease
      const currentGlareY = 50 + (targetGlareY - 50) * ease

      setTilt({
        rotateX: currentRotateX,
        rotateY: currentRotateY,
        glareX: currentGlareX,
        glareY: currentGlareY,
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered])

  /**
   * Tracks cursor position across the card to calculate authentic 3D tilt angles.
   * The card smoothly leans towards the pointer with dynamic specular reflection.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // Calculate normalized pointer coordinates (-1 to 1 relative to card center)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    // Maximum tilt angle in degrees
    const maxTilt = 14

    // Leaning towards the cursor position
    const rotateX = -y * maxTilt
    const rotateY = x * maxTilt

    // Glare coordinates in percentages
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100

    setTilt({ rotateX, rotateY, glareX, glareY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }



  const testLogs = [
    { name: "Auth Service :: Verify JWT Signature & Refresh", duration: "18ms", status: "passed" },
    { name: "Checkout API :: Process Payment Intent & Capture", duration: "42ms", status: "passed" },
    { name: "Data Sync :: Distributed Postgres CDC Ingestion", duration: "31ms", status: "passed" },
    { name: "Telemetry :: WebSocket Real-Time Event Stream", duration: "14ms", status: "passed" },
  ]

  const featureCards = [
    {
      icon: Zap,
      title: "Autonomous Execution",
      description: "Trigger thousands of end-to-end tests concurrently with sub-second cold starts.",
    },
    {
      icon: ShieldCheck,
      title: "Flaky Test Shield",
      description: "Intelligent regression detection isolates nondeterministic failures automatically.",
    },
    {
      icon: Cpu,
      title: "Zero-Config CI/CD",
      description: "Seamlessly integrates with GitHub Actions, GitLab CI, and custom Docker runners.",
    },
    {
      icon: Activity,
      title: "Deep Telemetry",
      description: "Inspect stack traces, network payloads, and execution flamegraphs in real time.",
    },
  ]

  const metrics = [
    { value: "10M+", label: "Tests run daily" },
    { value: "< 80ms", label: "Average pipeline latency" },
    { value: "99.9%", label: "Flakiness detection accuracy" },
    { value: "4.8x", label: "Faster release cycles" },
  ]

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Creative Effects */}
      {/* 1. Subtle Radial Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* 2. Top Centered Theme Glow Orb */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-125 w-187.5 rounded-full blur-[130px] opacity-25 pointer-events-none animate-pulse-subtle"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      {/* Hero Section Container */}
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8">
        {/* Top Header Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-text shadow-xs backdrop-blur-md transition-all hover:border-accent/40">
            <Sparkles className="h-3.5 w-3.5 text-accent animate-spin" style={{ animationDuration: "8s" }} />
            <span>UTester 2.0 is Live</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-accent">Explore Autonomous QA</span>
            <ArrowRight className="h-3 w-3 text-muted" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-8 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl">
            Automated Testing,{" "}
            <span className="bg-linear-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent">
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

          {/* Feature Highlights Pills */}
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

        {/* 3D Animated Terminal & Dashboard Showcase with Pointer-Tracking Tilt */}
        <div className="mt-16 sm:mt-20 perspective-1200 flex justify-center">
          <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateZ(10px)`,
              transition: isHovered
                ? "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)"
                : "none",
            }}
            className="relative w-full max-w-4xl rounded-2xl border border-border/80 bg-surface/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl preserve-3d"
          >
            {/* Dynamic Specular Glare Overlay (subtle when idle, bright when hovered) */}
            <div
              className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-10 ${
                isHovered ? "opacity-100" : "opacity-40"
              }`}
              style={{
                background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.08), transparent 70%)`,
              }}
            />

            {/* Top Floating 3D Badge (Layered depth) */}
            <div
              style={{ transform: "translateZ(38px)" }}
              className="hidden sm:flex absolute -top-5 -left-4 z-20 items-center gap-2 rounded-xl border border-border bg-surface/95 px-4 py-2 shadow-xl backdrop-blur-md animate-float-slow"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-text">1,248 Test Suites</div>
                <div className="text-[10px] text-muted">100% Passed • 0 Flaky</div>
              </div>
            </div>

            {/* Bottom Floating 3D Badge (Layered depth) */}
            <div
              style={{ transform: "translateZ(46px)" }}
              className="hidden sm:flex absolute -bottom-5 -right-4 z-20 items-center gap-2 rounded-xl border border-border bg-surface/95 px-4 py-2 shadow-xl backdrop-blur-md animate-float-reverse"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-soft text-accent">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-text">16 Cloud Runners</div>
                <div className="text-[10px] text-muted">Parallel execution active</div>
              </div>
            </div>

            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-muted">
                  utester-cli :: v2.8.4 &bull; test-runner
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                  Live Run
                </span>
              </div>
            </div>

            {/* Terminal Content / Telemetry Stream */}
            <div className="mt-4 space-y-2.5 font-mono text-xs">
              {testLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/40 px-3.5 py-2.5 transition-colors hover:bg-secondary/70"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-text font-medium">{log.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted">{log.duration}</span>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                      PASSED
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Progress Bar Indicator */}
            <div className="mt-5 rounded-xl border border-border/60 bg-secondary/30 p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-text flex items-center gap-1.5">
                  <Play className="h-3.5 w-3.5 text-accent fill-accent" />
                  Execution Progress
                </span>
                <span className="font-mono text-accent font-semibold">100% Completed (0.42s)</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-1000"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Feature Pillars */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Everything Needed for Uncompromised Quality
            </h2>
            <p className="mt-2 text-sm text-muted">
              Built from first principles for reliability, speed, and developer happiness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-border bg-surface p-6 shadow-xs transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-text group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Metrics Counter Section */}
        <div className="mt-20 rounded-2xl border border-border bg-surface/50 p-8 shadow-xs backdrop-blur-xs">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 text-center">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
                  {metric.value}
                </span>
                <span className="mt-1 text-xs text-muted font-medium">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
