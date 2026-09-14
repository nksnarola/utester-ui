import { useSyncExternalStore } from "react"
import { useAppSelector } from "./useAppStore"

function subscribeSystemTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getSystemSnapshot(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function getServerSnapshot(): boolean {
  return false
}

/**
 * Returns a reactive boolean indicating whether dark theme is currently active.
 * Uses useSyncExternalStore for optimal reactivity without unnecessary effect re-renders.
 */
export function useIsDarkMode(): boolean {
  const mode = useAppSelector((state) => state.theme.mode)
  const systemPrefersDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemSnapshot,
    getServerSnapshot
  )

  if (mode === "dark") return true
  if (mode === "light") return false
  return systemPrefersDark
}
