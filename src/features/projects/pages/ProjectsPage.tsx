import { Button } from "@/components/ui/button"
import { FolderGit2, Plus, ArrowUpRight } from "lucide-react"

export function ProjectsPage() {
  const projects = [
    {
      id: "proj-1",
      name: "E-Commerce Core API",
      testSuites: 42,
      lastRun: "10 mins ago",
      status: "Passing",
    },
    {
      id: "proj-2",
      name: "Customer Web App",
      testSuites: 88,
      lastRun: "1 hour ago",
      status: "Passing",
    },
    {
      id: "proj-3",
      name: "Payment Gateway Integration",
      testSuites: 19,
      lastRun: "Yesterday",
      status: "Attention",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text">Projects</h1>
          <p className="text-sm text-muted">
            Manage your test suites, environments, and CI/CD pipelines.
          </p>
        </div>
        <Button variant="default" size="sm" className="gap-1.5 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-text group-hover:bg-accent-soft group-hover:text-accent transition-colors">
                <FolderGit2 className="h-5 w-5" />
              </div>
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${
                  project.status === "Passing"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-text group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              <p className="mt-1 text-xs text-muted">
                {project.testSuites} test suites • Last run {project.lastRun}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-accent font-medium">
              <span>View Test Runs</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
