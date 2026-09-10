import { lazy, Suspense } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { AppLayout } from "@/components/layout/AppLayout"
import { ProtectedRoute } from "./ProtectedRoute"
import { PublicOnlyRoute } from "./PublicOnlyRoute"
import { PageLoader } from "@/components/common/PageLoader"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"

// Lazy-loaded dynamic page components
const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage }))
)
const LoginPage = lazy(() =>
  import("@/features/auth/pages/LoginPage").then((m) => ({ default: m.LoginPage }))
)
const RegisterPage = lazy(() =>
  import("@/features/auth/pages/RegisterPage").then((m) => ({ default: m.RegisterPage }))
)
const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/DashboardPage").then((m) => ({ default: m.DashboardPage }))
)
const ProjectsPage = lazy(() =>
  import("@/features/projects/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage }))
)
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
)

/**
 * Helper to wrap dynamic lazy-loaded page components with ErrorBoundary and PageLoader Suspense fallback
 */
function withSuspense(Component: React.ComponentType) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}

const router = createBrowserRouter([
  // Public Routes with PublicLayout
  {
    element: <PublicLayout />,
    errorElement: (
      <ErrorBoundary>
        <PublicLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: withSuspense(HomePage),
      },
    ],
  },

  // Auth Routes (restricted to unauthenticated users)
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        element: <AuthLayout />,
        errorElement: (
          <ErrorBoundary>
            <AuthLayout />
          </ErrorBoundary>
        ),
        children: [
          {
            path: "/login",
            element: withSuspense(LoginPage),
          },
          {
            path: "/register",
            element: withSuspense(RegisterPage),
          },
        ],
      },
    ],
  },

  // Protected / Private Routes with AppLayout (Dashboard shell)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <AppLayout />,
        errorElement: (
          <ErrorBoundary>
            <AppLayout />
          </ErrorBoundary>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/app/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: withSuspense(DashboardPage),
          },
          {
            path: "projects",
            element: withSuspense(ProjectsPage),
          },
        ],
      },
    ],
  },

  // 404 Catch-All Route with PublicLayout
  {
    element: <PublicLayout />,
    children: [
      {
        path: "*",
        element: withSuspense(NotFoundPage),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
