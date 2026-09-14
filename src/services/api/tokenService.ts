import type { TokenPair } from "./types"

const ACCESS_TOKEN_KEY = "utester_access_token"
const REFRESH_TOKEN_KEY = "utester_refresh_token"

export const tokenService = {
  getAccessToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY)
    } catch {
      return null
    }
  },

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  },

  setTokens(tokens: TokenPair): void {
    try {
      if (tokens.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
      }
      if (tokens.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
      }
    } catch {
      // Handle storage quota or disabled localStorage
    }
  },

  clearTokens(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    } catch {
      // Ignore errors when clearing
    }
  },

  hasTokens(): boolean {
    return Boolean(this.getAccessToken())
  },
}
