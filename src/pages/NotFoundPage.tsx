import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <span className="text-6xl font-black text-accent">404</span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="default" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
