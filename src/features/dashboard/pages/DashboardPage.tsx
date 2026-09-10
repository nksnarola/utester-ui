import { useAppSelector } from "@/hooks/useAppStore"
import { BarChart3, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth)

  const stats = [
    { label: "Total Test Runs", value: "1,248", icon: BarChart3, change: "+12% from last week" },
    { label: "Passed Tests", value: "98.4%", icon: CheckCircle, change: "+0.8% accuracy" },
    { label: "Avg. Duration", value: "4m 12s", icon: Clock, change: "-18s faster" },
    { label: "Active Flaky Tests", value: "3", icon: AlertCircle, change: "2 resolved today" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">Dashboard</h1>
        <p className="text-sm text-muted">
          Welcome back, {user?.name || "Tester"}. Here is the real-time test execution overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">{stat.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold tracking-tight text-text">
                  {stat.value}
                </span>
                <p className="mt-1 text-xs text-muted">{stat.change}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
        <h3 className="text-base font-semibold text-text">Recent Test Activity</h3>
        <p className="mt-1 text-xs text-muted">
          No test executions currently running. Trigger a test run from your projects page to view live telemetry.
        </p>
      </div>
    </div>
  )
}
