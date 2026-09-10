import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore"
import { logout } from "@/features/auth/store/authSlice"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/features/theme/components/ThemeToggle"
import {
  FlaskConical,
  LayoutDashboard,
  FolderGit2,
  LogOut,
  User,
} from "lucide-react"

export function AppLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const navItems = [
    { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
    { label: "Projects", to: "/app/projects", icon: FolderGit2 },
  ]

  return (
    <div className="flex min-h-screen bg-background text-text">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-surface md:flex">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FlaskConical className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xl font-bold tracking-tight text-text">UTester</span>
          <span className="ml-auto rounded bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent">
            PRO
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent-soft text-accent font-semibold"
                      : "text-muted hover:bg-secondary hover:text-text"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="border-t border-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-text border border-border">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="truncate text-xs font-semibold text-text">
                {user?.name || "Test User"}
              </span>
              <span className="truncate text-[11px] text-muted">
                {user?.email || "user@example.com"}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-xs text-muted hover:text-destructive hover:border-destructive/30"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground md:hidden">
              <FlaskConical className="h-4 w-4 text-accent" />
            </div>
            <span className="text-sm font-semibold text-text">Workspace</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted hidden sm:inline">
              Authenticated as <span className="font-medium text-text">{user?.email || "Session Active"}</span>
            </span>
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-xs md:hidden"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
