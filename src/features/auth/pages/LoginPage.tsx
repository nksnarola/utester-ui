import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAppDispatch } from "@/hooks/useAppStore"
import { loginSuccess } from "../store/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleAuthButton } from "../components/GoogleAuthButton"
import { validateEmail, validateLoginPassword } from "../utils/authValidation"

export function LoginPage() {
  const [email, setEmail] = useState("alex.morgan@example.com")
  const [password, setPassword] = useState("password123")
  const [showPassword, setShowPassword] = useState(false)

  // Form state
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/app/dashboard"

  // Field validation on blur
  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    let err: string | null = null

    if (field === "email") err = validateEmail(email)
    if (field === "password") err = validateLoginPassword(password)

    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  // Live change handlers
  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }))
    }
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validateLoginPassword(val) }))
    }
  }

  const validateAll = (): boolean => {
    const emailErr = validateEmail(email)
    const passwordErr = validateLoginPassword(password)

    setTouched({ email: true, password: true })
    setErrors({
      email: emailErr,
      password: passwordErr,
    })

    return !emailErr && !passwordErr
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAll()) {
      return
    }

    setIsSubmitting(true)

    // Simulated sign-in
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: "usr_1",
            name: "Alex Morgan",
            email: email.trim().toLowerCase(),
            role: "QA Engineer",
          },
          accessToken: "demo-jwt-access-token-xyz",
          refreshToken: "demo-jwt-refresh-token-xyz",
        })
      )
      setIsSubmitting(false)
      navigate(from, { replace: true })
    }, 400)
  }

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true)

    // Simulated Google OAuth login
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: `usr_google_${Date.now()}`,
            name: "Google User",
            email: "user@gmail.com",
            role: "QA Engineer",
          },
          accessToken: "mock-google-access-token",
          refreshToken: "mock-google-refresh-token",
        })
      )
      setIsGoogleLoading(false)
      navigate(from, { replace: true })
    }, 600)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text">Sign in to your account</h2>
        <p className="text-xs text-muted">Enter your credentials below to access the workspace</p>
      </div>

      {/* Form on top */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="login-email">
            Email address <span className="text-error">*</span>
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="alex.morgan@example.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => handleBlur("email")}
            error={Boolean(touched.email && errors.email)}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "login-email-error" : undefined}
          />
          {touched.email && errors.email && (
            <p id="login-email-error" className="mt-1 text-xs text-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="login-password">
            Password <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={Boolean(touched.password && errors.password)}
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? "login-password-error" : undefined}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors p-1 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {touched.password && errors.password && (
            <p id="login-password-error" className="mt-1 text-xs text-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full mt-2"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-surface px-2 text-muted font-medium">Or</span>
        </div>
      </div>

      {/* Google Button at the bottom */}
      <GoogleAuthButton
        onClick={handleGoogleLogin}
        isLoading={isGoogleLoading}
        text="Sign in with Google"
      />

      {/* Footer Navigation */}
      <div className="text-center text-xs text-muted">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-semibold text-accent hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  )
}
