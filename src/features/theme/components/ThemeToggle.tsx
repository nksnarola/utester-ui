import { Sun, Moon } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore"
import { setTheme } from "../store/themeSlice"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)

  // Determine effective theme (taking system preference into account if mode is 'system')
  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const handleToggle = () => {
    dispatch(setTheme(isDark ? "light" : "dark"))
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={className}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-muted hover:text-text transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  )
}
