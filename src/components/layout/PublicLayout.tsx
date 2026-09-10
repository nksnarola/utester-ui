import { Outlet, Link } from "react-router-dom"
import { useAppSelector } from "@/hooks/useAppStore"
import { Button } from "@/components/ui/button"
import { FlaskConical, ArrowRight, LayoutDashboard } from "lucide-react"
import { ThemeToggle } from "@/features/theme/components/ThemeToggle"

export function PublicLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      {/* Public Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 font-semibold text-primary">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xl font-bold tracking-tight text-text">UTester</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className="text-sm font-medium text-text hover:text-accent transition-colors">
              Home
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/app/dashboard">
                <Button variant="accent" size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="gap-1.5">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-border bg-surface py-8 text-muted text-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-accent" />
            <span className="font-semibold text-text">UTester</span>
            <span>&copy; {new Date().getFullYear()} UTester Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-text cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-text cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-text cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
