const CHUNK_RETRY_KEY = "utester_chunk_retry_count"
export const MAX_CHUNK_RETRIES = 3

/**
 * Checks whether an error is caused by a missing module import or failed dynamic import,
 * typical when a new deployment has replaced previous hashed chunk assets.
 */
export function isChunkLoadError(error: unknown): boolean {
  if (!error) return false

  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : ""

  const chunkErrorPatterns = [
    /failed to fetch dynamically imported module/i,
    /importing a module script failed/i,
    /error loading dynamically imported module/i,
    /loading chunk .* failed/i,
    /chunkloaderror/i,
    /unable to preload css/i,
    /failed to load module script/i,
  ]

  return chunkErrorPatterns.some((pattern) => pattern.test(message))
}

/**
 * Retrieves the current number of reload attempts for chunk errors from sessionStorage.
 */
export function getChunkRetryCount(): number {
  try {
    const value = sessionStorage.getItem(CHUNK_RETRY_KEY)
    if (!value) return 0
    const parsed = parseInt(value, 10)
    return isNaN(parsed) ? 0 : parsed
  } catch {
    return 0
  }
}

/**
 * Increments the chunk retry counter in sessionStorage and returns the new count.
 */
export function incrementChunkRetryCount(): number {
  try {
    const nextCount = getChunkRetryCount() + 1
    sessionStorage.setItem(CHUNK_RETRY_KEY, String(nextCount))
    return nextCount
  } catch {
    return 1
  }
}

/**
 * Clears the chunk retry counter from sessionStorage.
 */
export function resetChunkRetryCount(): void {
  try {
    sessionStorage.removeItem(CHUNK_RETRY_KEY)
  } catch {
    // Ignore sessionStorage access errors (e.g. storage disabled)
  }
}
