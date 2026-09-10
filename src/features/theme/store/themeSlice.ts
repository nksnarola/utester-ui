import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeState {
  mode: ThemeMode
}

const THEME_STORAGE_KEY = "utester_theme"

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

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      try {
        localStorage.setItem(THEME_STORAGE_KEY, action.payload)
      } catch {
        // Ignore localStorage error
      }
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
