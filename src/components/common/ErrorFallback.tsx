import { useState } from "react"
import { AlertTriangle, RotateCcw, Home, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resetChunkRetryCount } from "@/utils/errorUtils"

interface ErrorFallbackProps {
  error: Error | null
  isChunkError?: boolean
  onReset?: () => void
}

export function ErrorFallback({
  error,
  isChunkError = false,
  onReset,
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false)

  const handleHardReload = () => {
    resetChunkRetryCount()
    window.location.reload()
  }

  const handleGoHome = () => {
    resetChunkRetryCount()
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h2 className="text-xl font-bold tracking-tight text-primary sm:text-2xl">
        {isChunkError
          ? "Application Update Required"
          : "An unexpected error occurred"}
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted">
        {isChunkError
          ? "A new version of UTester has been deployed. We attempted to reload automatically, but could not load the updated files. Please refresh or clear your browser cache."
          : "We encountered an unexpected problem while rendering this page. You can try refreshing or returning to the home page."}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="default"
          onClick={handleHardReload}
          className="gap-2 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Refresh Page
        </Button>

        {onReset && !isChunkError && (
          <Button
            variant="outline"
            onClick={onReset}
            className="text-xs"
          >
            Try Again
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleGoHome}
          className="gap-2 text-xs"
        >
          <Home className="h-3.5 w-3.5" />
          Back to Home
        </Button>
      </div>

      {import.meta.env.DEV && error && (
        <div className="mt-8 w-full max-w-xl text-left">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-text mb-2 transition-colors"
          >
            {showDetails ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
            {showDetails ? "Hide Error Details" : "View Error Details (Development Only)"}
          </button>

          {showDetails && (
            <div className="rounded-lg border border-border bg-slate-900 p-4 text-xs font-mono text-slate-100 overflow-x-auto">
              <p className="font-bold text-red-400 mb-1">{error.name}: {error.message}</p>
              {error.stack && (
                <pre className="text-[11px] text-slate-400 whitespace-pre-wrap leading-relaxed">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
