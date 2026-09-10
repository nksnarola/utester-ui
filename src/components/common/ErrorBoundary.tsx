import React, { Component, type ReactNode } from "react"
import {
  isChunkLoadError,
  getChunkRetryCount,
  incrementChunkRetryCount,
  resetChunkRetryCount,
  MAX_CHUNK_RETRIES,
} from "@/utils/errorUtils"
import { PageLoader } from "./PageLoader"
import { ErrorFallback } from "./ErrorFallback"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  isChunkError: boolean
  isReloading: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      isChunkError: false,
      isReloading: false,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const chunkError = isChunkLoadError(error)
    return {
      hasError: true,
      error,
      isChunkError: chunkError,
    }
  }

  override componentDidMount(): void {
    // If the component tree mounted successfully without errors, reset any previous retry count
    if (!this.state.hasError) {
      resetChunkRetryCount()
    }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log unexpected errors for telemetry/debugging
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo)
    }

    // Check if error is due to missing dynamic chunk/module after deployment
    if (isChunkLoadError(error)) {
      const currentRetries = getChunkRetryCount()

      if (currentRetries < MAX_CHUNK_RETRIES) {
        const attempt = incrementChunkRetryCount()
        console.warn(
          `Dynamic import failed. Initiating automatic page refresh (attempt ${attempt} of ${MAX_CHUNK_RETRIES})...`
        )
        this.setState({ isReloading: true })

        // Trigger page refresh to fetch the newly deployed HTML and manifest
        window.location.reload()
        return
      }

      console.error(
        `Dynamic import failed after ${MAX_CHUNK_RETRIES} attempts. Displaying error fallback UI.`
      )
      this.setState({ isReloading: false, isChunkError: true })
    }
  }

  handleReset = (): void => {
    resetChunkRetryCount()
    this.setState({
      hasError: false,
      error: null,
      isChunkError: false,
      isReloading: false,
    })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  override render(): ReactNode {
    if (this.state.isReloading) {
      return <PageLoader message="New version detected. Updating application..." />
    }

    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.handleReset)
      }

      return (
        <ErrorFallback
          error={this.state.error}
          isChunkError={this.state.isChunkError}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}
