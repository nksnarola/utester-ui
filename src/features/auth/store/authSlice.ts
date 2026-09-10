import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  id: string
  name: string
  email: string
  role?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  token: string | null
  isLoading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
    },
    // Convenient toggle action for local development / testing route protection
    toggleAuth: (state) => {
      if (state.isAuthenticated) {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      } else {
        state.isAuthenticated = true
        state.user = {
          id: "u-1",
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "QA Engineer",
        }
        state.token = "mock-jwt-token"
      }
    },
  },
})

export const { loginSuccess, logout, toggleAuth } = authSlice.actions
export default authSlice.reducer
