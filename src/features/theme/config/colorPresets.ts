/**
 * @file colorPresets.ts
 * @description Central registry of curated color theme presets for UTester UI.
 * Each preset is meticulously balanced for WCAG AA compliance across both
 * Light Mode (#f8fafc / #ffffff) and Dark Mode (#020617 / #0f172a).
 */

export type ColorThemeId =
  | "cyan"
  | "indigo"
  | "violet"
  | "emerald"
  | "rose"
  | "amber"
  | "blue"
  | "teal"
  | "fuchsia"
  | "slate"

/**
 * Token definitions for dynamic CSS custom properties.
 * These map 1-to-1 with the Tailwind CSS v4 variables (--accent, --accent-soft, etc.)
 */
export interface ThemeTokens {
  /** Main vibrant accent color for active items, icons, and buttons */
  accent: string
  /** Tinted subtle background for active pills, tags, and icon containers */
  accentSoft: string
  /** High-contrast foreground text for solid accent elements */
  accentForeground: string
  /** Focus ring color */
  ring: string
}

/**
 * Configuration schema for a color preset.
 */
export interface ColorPreset {
  /** Unique identifier corresponding to ColorThemeId */
  id: ColorThemeId
  /** Human-readable display name */
  name: string
  /** Descriptive UI/UX aesthetic tag */
  description: string
  /** Representative hex color for picker swatches */
  swatch: string
  /** Light mode token palette */
  light: ThemeTokens
  /** Dark mode token palette */
  dark: ThemeTokens
}

/**
 * 10 Curated presets designed for high aesthetic appeal and optimal readability.
 */
export const COLOR_PRESETS: Record<ColorThemeId, ColorPreset> = {
  cyan: {
    id: "cyan",
    name: "Electric Cyan",
    description: "Modern tech & testing precision (Default)",
    swatch: "#06b6d4",
    light: {
      accent: "#0891b2", // Cyan 600 - High contrast on white
      accentSoft: "#cffafe", // Cyan 100 - Gentle pastel
      accentForeground: "#ffffff",
      ring: "#06b6d4",
    },
    dark: {
      accent: "#22d3ee", // Cyan 400 - Luminous glow on dark slate
      accentSoft: "#164e63", // Cyan 900 - Deep translucent tone
      accentForeground: "#083344",
      ring: "#22d3ee",
    },
  },

  indigo: {
    id: "indigo",
    name: "Royal Indigo",
    description: "Classic developer tools & SaaS elegance",
    swatch: "#6366f1",
    light: {
      accent: "#4f46e5", // Indigo 600
      accentSoft: "#e0e7ff", // Indigo 100
      accentForeground: "#ffffff",
      ring: "#6366f1",
    },
    dark: {
      accent: "#818cf8", // Indigo 400
      accentSoft: "#312e81", // Indigo 900
      accentForeground: "#0f172a",
      ring: "#818cf8",
    },
  },

  violet: {
    id: "violet",
    name: "Cosmic Violet",
    description: "Creative intelligence & futuristic purple",
    swatch: "#8b5cf6",
    light: {
      accent: "#7c3aed", // Violet 600
      accentSoft: "#ede9fe", // Violet 100
      accentForeground: "#ffffff",
      ring: "#8b5cf6",
    },
    dark: {
      accent: "#a78bfa", // Violet 400
      accentSoft: "#4c1d95", // Violet 900
      accentForeground: "#0f172a",
      ring: "#a78bfa",
    },
  },

  emerald: {
    id: "emerald",
    name: "Cyber Emerald",
    description: "Passing test runs, stability & freshness",
    swatch: "#10b981",
    light: {
      accent: "#059669", // Emerald 600
      accentSoft: "#d1fae5", // Emerald 100
      accentForeground: "#ffffff",
      ring: "#10b981",
    },
    dark: {
      accent: "#34d399", // Emerald 400
      accentSoft: "#064e3b", // Emerald 900
      accentForeground: "#022c22",
      ring: "#34d399",
    },
  },

  rose: {
    id: "rose",
    name: "Vivid Rose",
    description: "Energetic, bold & distinctive ruby pink",
    swatch: "#f43f5e",
    light: {
      accent: "#e11d48", // Rose 600
      accentSoft: "#ffe4e6", // Rose 100
      accentForeground: "#ffffff",
      ring: "#f43f5e",
    },
    dark: {
      accent: "#fb7185", // Rose 400
      accentSoft: "#881337", // Rose 900
      accentForeground: "#4c0519",
      ring: "#fb7185",
    },
  },

  amber: {
    id: "amber",
    name: "Solar Amber",
    description: "High-visibility, alert & warm golden optimism",
    swatch: "#f59e0b",
    light: {
      accent: "#d97706", // Amber 600
      accentSoft: "#fef3c7", // Amber 100
      accentForeground: "#ffffff",
      ring: "#f59e0b",
    },
    dark: {
      accent: "#fbbf24", // Amber 400
      accentSoft: "#78350f", // Amber 900
      accentForeground: "#451a03",
      ring: "#fbbf24",
    },
  },

  blue: {
    id: "blue",
    name: "Cobalt Blue",
    description: "Trusted enterprise reliability & deep focus",
    swatch: "#3b82f6",
    light: {
      accent: "#2563eb", // Blue 600
      accentSoft: "#dbeafe", // Blue 100
      accentForeground: "#ffffff",
      ring: "#3b82f6",
    },
    dark: {
      accent: "#60a5fa", // Blue 400
      accentSoft: "#1e3a8a", // Blue 900
      accentForeground: "#082f49",
      ring: "#60a5fa",
    },
  },

  teal: {
    id: "teal",
    name: "Neo Teal",
    description: "Crisp oceanic calm & clinical testing focus",
    swatch: "#14b8a6",
    light: {
      accent: "#0d9488", // Teal 600
      accentSoft: "#ccfbf1", // Teal 100
      accentForeground: "#ffffff",
      ring: "#14b8a6",
    },
    dark: {
      accent: "#2dd4bf", // Teal 400
      accentSoft: "#134e4a", // Teal 900
      accentForeground: "#042f2e",
      ring: "#2dd4bf",
    },
  },

  fuchsia: {
    id: "fuchsia",
    name: "Neon Fuchsia",
    description: "Synthwave flair & punchy neon brilliance",
    swatch: "#d946ef",
    light: {
      accent: "#c026d3", // Fuchsia 600
      accentSoft: "#fae8ff", // Fuchsia 100
      accentForeground: "#ffffff",
      ring: "#d946ef",
    },
    dark: {
      accent: "#e879f9", // Fuchsia 400
      accentSoft: "#701a75", // Fuchsia 900
      accentForeground: "#3b0764",
      ring: "#e879f9",
    },
  },

  slate: {
    id: "slate",
    name: "Carbon Slate",
    description: "Minimalist stealth & refined industrial neutrality",
    swatch: "#64748b",
    light: {
      accent: "#475569", // Slate 600
      accentSoft: "#f1f5f9", // Slate 100
      accentForeground: "#ffffff",
      ring: "#64748b",
    },
    dark: {
      accent: "#94a3b8", // Slate 400
      accentSoft: "#1e293b", // Slate 800
      accentForeground: "#020617",
      ring: "#94a3b8",
    },
  },
}

/** Array of all preset options for easy rendering in menus and grids */
export const COLOR_PRESET_LIST: ColorPreset[] = Object.values(COLOR_PRESETS)

/**
 * Retrieves a preset by ID with safe fallback to "cyan".
 * @param id The color theme ID
 */
export function getColorPreset(id: ColorThemeId): ColorPreset {
  return COLOR_PRESETS[id] || COLOR_PRESETS.cyan
}
