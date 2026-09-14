import { Outlet, Link } from "react-router-dom"
import { Logo } from "@/components/common/Logo"
import { ThemeToggle } from "@/features/theme/components/ThemeToggle"

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-background py-12 sm:px-6 lg:px-8 text-text">
      {/* Top right theme toggle */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <Logo variant="full" className="h-16 w-auto" />
          </Link>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
          <Outlet />
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Secure enterprise test management & automation platform
        </p>
      </div>
    </div>
  )
}
