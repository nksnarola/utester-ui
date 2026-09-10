import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useAppStore"
import { loginSuccess } from "../store/authSlice"
import { Button } from "@/components/ui/button"

export function RegisterPage() {
  const [name, setName] = useState("Alex Morgan")
  const [email, setEmail] = useState("alex.morgan@example.com")
  const [password, setPassword] = useState("password123")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      loginSuccess({
        user: {
          id: "usr_1",
          name: name,
          email: email,
          role: "QA Engineer",
        },
        token: "demo-jwt-token-xyz",
      })
    )
    navigate("/app/dashboard", { replace: true })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text">Create an account</h2>
        <p className="text-xs text-muted">Get started with your free enterprise testing trial</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

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
          Create Account
        </Button>
      </form>

      <div className="text-center text-xs text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
