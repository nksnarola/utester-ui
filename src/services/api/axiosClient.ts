import axios, { type AxiosInstance } from "axios"

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"

/**
 * Primary Axios client configured with interceptors for auth headers,
 * 401 automatic token refresh, and standardized error normalization.
 */
export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

/**
 * Dedicated Axios client without interceptors, specifically used for
 * token refresh requests to eliminate any risk of circular 401 retry loops.
 */
export const refreshClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
