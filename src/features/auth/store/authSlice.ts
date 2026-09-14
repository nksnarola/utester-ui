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
  /** Primary Bearer access token for authenticating API requests */
  accessToken: string | null
  /** Long-lived refresh token used to rotate expired access tokens */
  refreshToken: string | null
  /**
   * @deprecated Standardized to `accessToken`. Retained as a backward-compatible alias for any legacy callers.
   */
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
        /** @deprecated Use `accessToken` instead */
        token?: string
      }>
    ) => {
      // Standardize access token extraction: prefer explicit `accessToken`, fallback to legacy `token`
      const accessToken = action.payload.accessToken || action.payload.token || ""
      const refreshToken = action.payload.refreshToken || ""

      state.isAuthenticated = true
      state.user = action.payload.user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.token = accessToken // Maintain alias for backward compatibility

      tokenService.setTokens({
        accessToken,
        refreshToken,
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
        const mockAccessToken = "mock-access-token-jwt"
        const mockRefreshToken = "mock-refresh-token-jwt"

        state.isAuthenticated = true
        state.user = {
          id: "u-1",
          name: "Alex Morgan",
          email: "alex.morgan@example.com",
          role: "QA Engineer",
        }
        state.accessToken = mockAccessToken
        state.refreshToken = mockRefreshToken
        state.token = mockAccessToken

        tokenService.setTokens({
          accessToken: mockAccessToken,
          refreshToken: mockRefreshToken,
        })
      }
    },
  },
})

export const { loginSuccess, tokenRefreshed, logout, toggleAuth } = authSlice.actions
export default authSlice.reducer
