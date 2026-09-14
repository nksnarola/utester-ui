import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/hooks/useAppStore"

export function PublicOnlyRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />
  }

  return <Outlet />
}
