export interface ApiError {
  message: string
  status?: number
  code?: string
  errors?: Record<string, string[] | string>
  isNetworkError?: boolean
}

export interface TokenPair {
  accessToken: string
  refreshToken?: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
  accessToken: string
  refreshToken?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
}
