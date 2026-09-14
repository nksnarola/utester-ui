import { refreshClient, axiosClient } from "./axiosClient"
import type { AuthResponse, TokenPair } from "./types"

export interface LoginCredentials {
  email: string
  password: string
}

export const authApi = {
  /**
   * Refreshes the expired access token using the provided refresh token.
   * Utilizes the dedicated refreshClient to prevent recursive interceptor loops.
   */
  async refreshToken(refreshToken: string): Promise<TokenPair> {
    const response = await refreshClient.post<TokenPair>("/auth/refresh", {
      refreshToken,
    })
    return response.data
  },

  /**
   * Authenticates user with credentials.
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>("/auth/login", credentials)
    return response.data
  },

  /**
   * Logs out user and invalidates server-side session.
   */
  async logout(): Promise<void> {
    try {
      await axiosClient.post("/auth/logout")
    } catch {
      // Allow client logout even if server logout fails
    }
  },
}
