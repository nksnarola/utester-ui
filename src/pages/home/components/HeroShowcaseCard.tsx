import { CheckCircle2, Play, Zap } from "lucide-react"
import { useSmoothTilt } from "../hooks/useSmoothTilt"
import { TEST_LOGS } from "../constants"

export function HeroShowcaseCard() {
  const {
    cardRef,
    isHovered,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useSmoothTilt({ maxTilt: 13, hoverDamping: 9.0, idleDamping: 4.0 })

  return (
    <div className="mt-16 sm:mt-20 perspective-1200 flex justify-center">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "rotateX(3deg) rotateY(-6deg) translateZ(10px)",
          willChange: "transform",
        }}
        className="relative w-full max-w-4xl rounded-2xl border border-border/80 bg-surface/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl preserve-3d cursor-default"
      >
        {/* Dynamic Specular Glare Overlay (synchronized in RAF loop with tilt) */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-10 ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
          style={{
            background:
              "radial-gradient(circle 350px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.08), transparent 70%)",
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
          {TEST_LOGS.map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/40 px-3.5 py-2.5 transition-colors hover:bg-secondary/70"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
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
  )
}
