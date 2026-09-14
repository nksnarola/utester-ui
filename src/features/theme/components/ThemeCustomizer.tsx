import { useState, useRef, useEffect } from "react"
import { Palette, Check, Sun, Moon, Monitor, X, Sparkles } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore"
import { setTheme, setColorTheme, type ThemeMode } from "../store/themeSlice"
import {
  COLOR_PRESET_LIST,
  getColorPreset,
  type ColorThemeId,
} from "../config/colorPresets"
import { Button } from "@/components/ui/button"

interface ThemeCustomizerProps {
  /** Optional custom CSS classes for trigger container */
  className?: string
  /** Trigger button variant */
  buttonVariant?: "ghost" | "outline" | "default"
  /** Whether to show a text label next to the palette icon */
  showLabel?: boolean
}

/**
 * ThemeCustomizer provides signed-in users with a rich, interactive control panel
 * to switch interface modes (Light, Dark, System) and select from 10 curated color presets.
 * 
 * It gives instantaneous visual feedback across the workspace via reactive CSS custom properties.
 */
export function ThemeCustomizer({
  className,
  buttonVariant = "ghost",
  showLabel = false,
}: ThemeCustomizerProps) {
  const dispatch = useAppDispatch()
  const { mode, colorTheme } = useAppSelector((state) => state.theme)
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const activePreset = getColorPreset(colorTheme)

  // Close when clicking outside of the popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    // Close on Escape key press
    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleModeChange = (newMode: ThemeMode) => {
    dispatch(setTheme(newMode))
  }

  const handleColorChange = (presetId: ColorThemeId) => {
    dispatch(setColorTheme(presetId))
  }

  return (
    <div className={`relative inline-block ${className || ""}`}>
      {/* Trigger Button */}
      <Button
        ref={triggerRef}
        variant={buttonVariant}
        size={showLabel ? "sm" : "icon"}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Customize theme color and appearance"
        title="Customize Theme & Colors"
        className="relative group gap-2"
      >
        <div className="relative flex items-center justify-center">
          <Palette className="h-4 w-4 text-muted group-hover:text-text transition-colors" />
          {/* Glowing active color indicator pip */}
          <span
            className="absolute -top-1 -right-1 h-2 w-2 rounded-full ring-1 ring-surface shadow-xs transition-colors"
            style={{ backgroundColor: activePreset.swatch }}
          />
        </div>
        {showLabel && (
          <span className="text-xs font-medium text-text">Theme</span>
        )}
      </Button>

      {/* Popover Panel */}
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Theme and Appearance Settings"
          className="absolute right-0 top-full z-50 mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-surface/95 p-4 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-text">
                  Theme & Appearance
                </h3>
                <p className="text-[11px] text-muted">
                  Personalize your workspace palette
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-muted hover:bg-secondary hover:text-text transition-colors"
              aria-label="Close theme settings"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Mode Selector (Light, Dark, System) */}
          <div className="mt-3.5">
            <label className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2 block">
              Interface Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-secondary/80 p-1 border border-border/50">
              <button
                type="button"
                onClick={() => handleModeChange("light")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all ${
                  mode === "light"
                    ? "bg-surface text-text shadow-xs border border-border/80"
                    : "text-muted hover:text-text"
                }`}
              >
                <Sun className="h-3.5 w-3.5 text-amber-500" />
                Light
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("dark")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all ${
                  mode === "dark"
                    ? "bg-surface text-text shadow-xs border border-border/80"
                    : "text-muted hover:text-text"
                }`}
              >
                <Moon className="h-3.5 w-3.5 text-indigo-400" />
                Dark
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("system")}
                className={`flex items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all ${
                  mode === "system"
                    ? "bg-surface text-text shadow-xs border border-border/80"
                    : "text-muted hover:text-text"
                }`}
              >
                <Monitor className="h-3.5 w-3.5 text-muted" />
                System
              </button>
            </div>
          </div>

          {/* Color Presets Grid (10 Presets) */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-muted">
                Accent Color
              </label>
              <span className="text-[11px] font-medium text-accent">
                {activePreset.name}
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label="Preset color choices"
              className="grid grid-cols-5 gap-2"
            >
              {COLOR_PRESET_LIST.map((preset) => {
                const isSelected = preset.id === colorTheme
                return (
                  <button
                    key={preset.id}
                    role="radio"
                    aria-checked={isSelected}
                    type="button"
                    onClick={() => handleColorChange(preset.id)}
                    title={`${preset.name}: ${preset.description}`}
                    className={`group relative flex flex-col items-center justify-center rounded-xl p-2 transition-all hover:bg-secondary/70 ${
                      isSelected
                        ? "bg-secondary ring-1.5 ring-accent shadow-xs"
                        : "border border-transparent"
                    }`}
                  >
                    {/* Color Swatch Circle */}
                    <div
                      className="relative flex h-7 w-7 items-center justify-center rounded-full shadow-xs transition-transform group-hover:scale-110"
                      style={{ backgroundColor: preset.swatch }}
                    >
                      {isSelected && (
                        <Check className="h-4 w-4 text-white drop-shadow-md stroke-[3]" />
                      )}
                    </div>
                    {/* Swatch Label */}
                    <span className="mt-1 text-[10px] font-medium text-text/80 truncate w-full text-center">
                      {preset.name.split(" ")[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-muted mb-2">
              <span>Live UI Preview</span>
              <span className="text-[10px] text-accent font-semibold">Active</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Mini Pill Badge */}
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: activePreset.swatch }}
                />
                Active Pill
              </span>
              {/* Mini Accent Button */}
              <span className="inline-flex items-center justify-center rounded-md bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground shadow-xs">
                Button
              </span>
              {/* Mini Border Highlight */}
              <span className="inline-flex items-center justify-center rounded-md border border-accent/40 bg-surface px-2.5 py-0.5 text-[11px] font-medium text-text">
                Border
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
