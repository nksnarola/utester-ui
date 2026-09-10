import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useAppStore"
import { loginSuccess } from "../store/authSlice"
import { Button } from "@/components/ui/button"

export function LoginPage() {
  const [email, setEmail] = useState("alex.morgan@example.com")
  const [password, setPassword] = useState("password123")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/app/dashboard"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated sign-in
    dispatch(
      loginSuccess({
        user: {
          id: "usr_1",
          name: "Alex Morgan",
          email: email,
          role: "QA Engineer",
        },
        token: "demo-jwt-token-xyz",
      })
    )
    navigate(from, { replace: true })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text">Sign in to your account</h2>
        <p className="text-xs text-muted">Enter your credentials below to access the workspace</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <Button type="submit" variant="default" className="w-full mt-2">
          Sign In
        </Button>
      </form>

      <div className="text-center text-xs text-muted">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-accent hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  )
}
