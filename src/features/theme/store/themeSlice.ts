import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type ColorThemeId, COLOR_PRESETS } from "../config/colorPresets"

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeState {
  /** Dark, light, or OS-matching mode */
  mode: ThemeMode
  /** Selected color theme preset ID (e.g. cyan, violet, emerald) */
  colorTheme: ColorThemeId
}

const THEME_STORAGE_KEY = "utester_theme"
const COLOR_THEME_STORAGE_KEY = "utester_color_theme"

/**
 * Retrieves the persisted mode from localStorage, defaulting to 'system'.
 */
function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved
    }
  } catch {
    // Fallback if localStorage is inaccessible
  }
  return "system"
}

/**
 * Retrieves the persisted color preset from localStorage, defaulting to 'cyan'.
 */
function getInitialColorTheme(): ColorThemeId {
  try {
    const saved = localStorage.getItem(COLOR_THEME_STORAGE_KEY) as ColorThemeId
    if (saved && saved in COLOR_PRESETS) {
      return saved
    }
  } catch {
    // Fallback if localStorage is inaccessible
  }
  return "cyan"
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
  colorTheme: getInitialColorTheme(),
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /** Sets the dark/light mode and saves to localStorage */
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      try {
        localStorage.setItem(THEME_STORAGE_KEY, action.payload)
      } catch {
        // Ignore localStorage error
      }
    },
    /** Sets the color theme preset and saves to localStorage */
    setColorTheme: (state, action: PayloadAction<ColorThemeId>) => {
      state.colorTheme = action.payload
      try {
        localStorage.setItem(COLOR_THEME_STORAGE_KEY, action.payload)
      } catch {
        // Ignore localStorage error
      }
    },
  },
})

export const { setTheme, setColorTheme } = themeSlice.actions
export default themeSlice.reducer

