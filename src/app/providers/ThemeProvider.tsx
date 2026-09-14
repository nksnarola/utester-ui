import { useEffect, type ReactNode } from "react"
import { useAppSelector } from "@/hooks/useAppStore"
import { getColorPreset } from "@/features/theme/config/colorPresets"

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider manages both the Dark/Light mode and the active Color Theme preset.
 *
 * It dynamically sets CSS custom properties (--accent, --accent-soft, --accent-foreground, --ring)
 * directly on document.documentElement. This provides:
 * 1. Zero lag / immediate color switching across the entire DOM without component re-renders.
 * 2. Complete synchrony between dark/light mode and the appropriate light/dark color tokens.
 * 3. Immediate persistence across browser refreshes and tabs.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useAppSelector((state) => state.theme.mode)
  const colorTheme = useAppSelector((state) => state.theme.colorTheme)

  useEffect(() => {
    const root = document.documentElement

    /**
     * Applies the mode class and custom CSS property tokens to the root document.
     * @param isDark Whether dark mode is currently active
     */
    const applyThemeTokens = (isDark: boolean) => {
      // 1. Toggle dark class for Tailwind v4 and CSS selector styling
      if (isDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }

      // 2. Resolve the active color preset and respective mode tokens
      const preset = getColorPreset(colorTheme)
      const tokens = isDark ? preset.dark : preset.light

      // 3. Inject CSS custom properties for immediate application
      root.style.setProperty("--accent", tokens.accent)
      root.style.setProperty("--accent-soft", tokens.accentSoft)
      root.style.setProperty("--accent-foreground", tokens.accentForeground)
      root.style.setProperty("--ring", tokens.ring)

      // 4. Set data attributes for easier CSS debugging and styling hooks
      root.setAttribute("data-color-theme", colorTheme)

      // Set icons
      const favicon = document.getElementById("app-favicon") as HTMLLinkElement | null
      if (favicon) {
        favicon.href = isDark
          ? "/images/logo/utester-logo-dark-icon.png"
          : "/images/logo/utester-logo-light-icon.png"
      }
    }

    if (mode === "dark") {
      applyThemeTokens(true)
      return
    }

    if (mode === "light") {
      applyThemeTokens(false)
      return
    }

    // System mode: respond dynamically to OS color scheme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    applyThemeTokens(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      applyThemeTokens(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [mode, colorTheme])

  return <>{children}</>
}

