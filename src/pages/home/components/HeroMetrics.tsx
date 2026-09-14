import { METRICS } from "../constants"

export function HeroMetrics() {
  return (
    <div className="mt-20 rounded-2xl border border-border bg-surface/50 p-8 shadow-xs backdrop-blur-xs">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 text-center">
        {METRICS.map((metric, i) => (
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
  )
}
