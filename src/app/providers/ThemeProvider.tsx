import { useEffect, type ReactNode } from "react"
import { useAppSelector } from "@/hooks/useAppStore"

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { mode } = useAppSelector((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }

    if (mode === "dark") {
      applyTheme(true)
      return
    }

    if (mode === "light") {
      applyTheme(false)
      return
    }

    // System mode: respond to OS preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    applyTheme(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [mode])

  return <>{children}</>
}
