import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios"
import { axiosClient } from "./axiosClient"
import { tokenService } from "./tokenService"
import { authApi } from "./authApi"
import type { ApiError } from "./types"
import type { AppDispatch } from "@/store"
import { logout, tokenRefreshed } from "@/features/auth/store/authSlice"

// Extend Axios request config to support retry flag
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

// Queue item definition for requests waiting to be re-issued after token refresh
interface QueueItem {
  config: CustomRequestConfig
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void
  reject: (reason?: unknown) => void
}

let isRefreshing = false
let failedQueue: QueueItem[] = []

/**
 * Re-issues all queued requests with the new access token, or rejects them if refresh failed.
 */
function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach(({ config, resolve, reject }) => {
    if (error) {
      reject(normalizeError(error))
    } else if (token) {
      // Mark request as retried to prevent infinite retry loops
      config._retry = true

      // Update Authorization header with the fresh token
      if (config.headers) {
        if (typeof config.headers.set === "function") {
          config.headers.set("Authorization", `Bearer ${token}`)
        } else {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      // Re-issue the queued request through axiosClient and pass result to caller
      axiosClient(config)
        .then((response) => resolve(response))
        .catch((requestError) => reject(normalizeError(requestError)))
    }
  })
  failedQueue = []
}

/**
 * Standardizes raw Axios / network errors into a consistent ApiError interface
 */
export function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return {
        message: error.message || "Network error. Please check your internet connection.",
        isNetworkError: true,
      }
    }

    const data = error.response.data as Record<string, unknown> | undefined
    const message =
      (typeof data?.message === "string" && data.message) ||
      (typeof data?.error === "string" && data.error) ||
      error.message ||
      `Request failed with status code ${error.response.status}`

    return {
      message,
      status: error.response.status,
      code: typeof data?.code === "string" ? data.code : undefined,
      errors: data?.errors as Record<string, string[] | string> | undefined,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    }
  }

  return {
    message: "An unexpected error occurred. Please try again.",
  }
}

/**
 * Configures request and response interceptors on the main axiosClient.
 * Injects the Redux store dispatch so auth actions can be dispatched seamlessly.
 */
export function setupAxiosInterceptors(dispatch?: AppDispatch): void {
  // 1. Request Interceptor: Attach Bearer token
  axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenService.getAccessToken()
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: unknown) => {
      return Promise.reject(normalizeError(error))
    }
  )

  // 2. Response Interceptor: Error handling and 401 token refresh queue
  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomRequestConfig | undefined

      // Check if this error is an unauthorized (401) error and eligible for retry
      const is401 = error.response?.status === 401
      const isRefreshCall = originalRequest?.url?.includes("/auth/refresh")

      if (is401 && originalRequest && !originalRequest._retry && !isRefreshCall) {
        const refreshToken = tokenService.getRefreshToken()

        // If there's no refresh token available, logout immediately
        if (!refreshToken) {
          tokenService.clearTokens()
          if (dispatch) dispatch(logout())
          if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login"
          }
          return Promise.reject(normalizeError(error))
        }

        // If a refresh request is already in-flight, queue this request to be re-issued
        if (isRefreshing) {
          return new Promise<AxiosResponse>((resolve, reject) => {
            failedQueue.push({ config: originalRequest, resolve, reject })
          })
        }

        // Begin token refresh
        originalRequest._retry = true
        isRefreshing = true

        try {
          const newTokens = await authApi.refreshToken(refreshToken)

          // Save new tokens to storage and Redux store
          tokenService.setTokens(newTokens)
          if (dispatch) {
            dispatch(
              tokenRefreshed({
                accessToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
              })
            )
          }

          // Re-issue all queued requests with the new access token
          processQueue(null, newTokens.accessToken)

          // Re-send the original request with the fresh token
          if (originalRequest.headers) {
            if (typeof originalRequest.headers.set === "function") {
              originalRequest.headers.set("Authorization", `Bearer ${newTokens.accessToken}`)
            } else {
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`
            }
          }
          return axiosClient(originalRequest)
        } catch (refreshError) {
          // Token refresh failed: reject queue, wipe tokens, dispatch logout, and redirect
          processQueue(refreshError, null)
          tokenService.clearTokens()
          if (dispatch) {
            dispatch(logout())
          }
          if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
            window.location.href = "/login"
          }
          return Promise.reject(normalizeError(refreshError))
        } finally {
          isRefreshing = false
        }
      }

      // Return normalized error for all other error scenarios
      return Promise.reject(normalizeError(error))
    }
  )
}
