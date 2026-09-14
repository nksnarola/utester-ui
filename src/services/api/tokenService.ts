import type { TokenPair } from "./types"

const ACCESS_TOKEN_KEY = "utester_access_token"
const REFRESH_TOKEN_KEY = "utester_refresh_token"

/**
 * Service for securely persisting and retrieving OAuth/JWT token pairs in localStorage.
 * Standardized on explicit `accessToken` (short-lived Bearer) and `refreshToken` (session rotation) schemas.
 */
export const tokenService = {
  /**
   * Retrieves the current Bearer access token used to authorize API requests.
   * Returns `null` if no active session exists or storage is inaccessible.
   */
  getAccessToken(): string | null {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY)
    } catch {
      return null
    }
  },

  /**
   * Retrieves the refresh token used to obtain a fresh access token on 401 Unauthorized.
   * Returns `null` if no refresh token is stored.
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  },

  /**
   * @deprecated Legacy alias for `getAccessToken()`. Standardized on `getAccessToken()`.
   */
  getToken(): string | null {
    return this.getAccessToken()
  },

  /**
   * Persists both `accessToken` and `refreshToken` to local storage.
   */
  setTokens(tokens: TokenPair): void {
    try {
      if (tokens.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken)
      }
      if (tokens.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken)
      }
    } catch {
      // Handle storage quota or disabled localStorage gracefully
    }
  },

  /**
   * Clears both access and refresh tokens from storage upon logout or session invalidation.
   */
  clearTokens(): void {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    } catch {
      // Ignore errors when clearing
    }
  },

  /**
   * Checks whether a valid access token currently exists in storage.
   */
  hasTokens(): boolean {
    return Boolean(this.getAccessToken())
  },
}
