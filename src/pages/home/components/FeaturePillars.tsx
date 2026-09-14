import { FEATURE_CARDS } from "../constants"

export function FeaturePillars() {
  return (
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
        {FEATURE_CARDS.map((feature, i) => {
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
  )
}
