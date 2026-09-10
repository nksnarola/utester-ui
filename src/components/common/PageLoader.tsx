import { FlaskConical } from "lucide-react"

interface PageLoaderProps {
  /** Optional message displayed below the spinner */
  message?: string
}

export function PageLoader({ message = "Loading workspace..." }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/85 backdrop-blur-sm transition-opacity duration-200"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated outer accent ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-slate-200 border-t-accent" />

        {/* Central emblem */}
        <div className="absolute flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
          <FlaskConical className="h-5 w-5 text-accent" />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 text-center">
        <span className="text-sm font-semibold text-text tracking-tight">UTester</span>
        <p className="text-xs text-muted font-medium">{message}</p>
      </div>
    </div>
  )
}
