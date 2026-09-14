import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { tokenService } from "@/services/api/tokenService"

export interface AuthUser {
  id: string
  name: string
  email: string
  role?: string
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  /** Alias for accessToken for backward compatibility */
  token: string | null
  isLoading: boolean
}

const initialAccessToken = tokenService.getAccessToken()
const initialRefreshToken = tokenService.getRefreshToken()

const initialState: AuthState = {
  isAuthenticated: Boolean(initialAccessToken),
  user: initialAccessToken
    ? {
        id: "u-1",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        role: "QA Engineer",
      }
    : null,
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  token: initialAccessToken,
  isLoading: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        user: AuthUser
        accessToken?: string
        refreshToken?: string
        token?: string
      }>
    ) => {
      const access = action.payload.accessToken || action.payload.token || ""
      const refresh = action.payload.refreshToken || ""

      state.isAuthenticated = true
      state.user = action.payload.user
      state.accessToken = access
      state.refreshToken = refresh
      state.token = access

      tokenService.setTokens({
        accessToken: access,
        refreshToken: refresh,
      })
    },

    tokenRefreshed: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken?: string }>
    ) => {
      state.accessToken = action.payload.accessToken
      state.token = action.payload.accessToken

      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }

      tokenService.setTokens({
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken || state.refreshToken || undefined,
      })
    },

    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.token = null

      tokenService.clearTokens()
    },

    // Convenient toggle action for local development / testing route protection
    toggleAuth: (state) => {
      if (state.isAuthenticated) {
        state.isAuthenticated = false
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        state.token = null

        tokenService.clearTokens()
      } else {
        const mockAccess = "mock-access-token-jwt"
        const mockRefresh = "mock-refresh-token-jwt"

        state.isAuthenticated = true
        state.user = {
          id: "u-1",
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "QA Engineer",
        }
        state.accessToken = mockAccess
        state.refreshToken = mockRefresh
        state.token = mockAccess

        tokenService.setTokens({
          accessToken: mockAccess,
          refreshToken: mockRefresh,
        })
      }
    },
  },
})

export const { loginSuccess, tokenRefreshed, logout, toggleAuth } = authSlice.actions
export default authSlice.reducer
