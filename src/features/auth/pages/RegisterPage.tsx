import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Eye, EyeOff, Tag, Users, CheckCircle2 } from "lucide-react"
import { useAppDispatch } from "@/hooks/useAppStore"
import { loginSuccess } from "../store/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleAuthButton } from "../components/GoogleAuthButton"
import {
  validateName,
  validateEmail,
  validatePassword,
  formatPromoCode,
  formatReferralCode,
} from "../utils/authValidation"

export function RegisterPage() {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Form values
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  // Initialize promo & referral codes directly from URL parameters
  const [promoCode, setPromoCode] = useState(() => {
    const promoFromUrl =
      searchParams.get("promo") ||
      searchParams.get("promo_code") ||
      searchParams.get("promocode")
    return promoFromUrl ? formatPromoCode(promoFromUrl) : ""
  })

  const [referralCode, setReferralCode] = useState(() => {
    const refFromUrl =
      searchParams.get("ref") ||
      searchParams.get("referral") ||
      searchParams.get("referral_code")
    return refFromUrl ? formatReferralCode(refFromUrl) : ""
  })

  // Form state
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  // Field validation handler
  const handleBlur = (field: "name" | "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    let err: string | null = null

    if (field === "name") err = validateName(name)
    if (field === "email") err = validateEmail(email)
    if (field === "password") err = validatePassword(password)

    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  // Handle live changes and clear error if field becomes valid
  const handleNameChange = (val: string) => {
    setName(val)
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(val) }))
    }
  }

  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }))
    }
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }))
    }
  }

  const handlePromoChange = (val: string) => {
    // Automatically formats to uppercase and max 8 characters
    setPromoCode(formatPromoCode(val))
  }

  const handleReferralChange = (val: string) => {
    setReferralCode(formatReferralCode(val))
  }

  const validateAll = (): boolean => {
    const nameErr = validateName(name)
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password)

    setTouched({ name: true, email: true, password: true })
    setErrors({
      name: nameErr,
      email: emailErr,
      password: passwordErr,
    })

    return !nameErr && !emailErr && !passwordErr
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAll()) {
      return
    }

    setIsSubmitting(true)

    // Simulate account registration
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: {
            id: `usr_${Date.now()}`,
            name: name.trim(),
            email: email.trim().toLowerCase(),
            role: "QA Engineer",
          },
          accessToken: "mock-jwt-access-token",
          refreshToken: "mock-jwt-refresh-token",
        })
      )
      setIsSubmitting(false)
      navigate("/app/dashboard", { replace: true })
    }, 400)
  }

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true)

    // Simulate Google OAuth flow
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
      navigate("/app/dashboard", { replace: true })
    }, 600)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text">Create an account</h2>
        <p className="text-xs text-muted">Get started with your free enterprise testing trial</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="name">
            Full name <span className="text-error">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="e.g. Alex Morgan"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => handleBlur("name")}
            error={Boolean(touched.name && errors.name)}
            aria-invalid={Boolean(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? "name-error" : undefined}
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-1 text-xs text-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="email">
            Email address <span className="text-error">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="alex.morgan@company.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={() => handleBlur("email")}
            error={Boolean(touched.email && errors.email)}
            aria-invalid={Boolean(touched.email && errors.email)}
            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-1 text-xs text-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-text mb-1" htmlFor="password">
            Password <span className="text-error">*</span>
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters with letters & numbers"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={Boolean(touched.password && errors.password)}
              aria-invalid={Boolean(touched.password && errors.password)}
              aria-describedby={touched.password && errors.password ? "password-error" : undefined}
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
            <p id="password-error" className="mt-1 text-xs text-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Promo Code & Referral Code Section */}
        <div className="pt-2 border-t border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Promo Code Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-text" htmlFor="promoCode">
                  <Tag className="w-3.5 h-3.5 text-accent" />
                  Promo code
                </label>
                <span className="text-[10px] text-muted uppercase font-mono">
                  {promoCode.length}/8
                </span>
              </div>
              <div className="relative">
                <Input
                  id="promoCode"
                  type="text"
                  placeholder="MAX 8 CHARS"
                  value={promoCode}
                  maxLength={8}
                  onChange={(e) => handlePromoChange(e.target.value)}
                  className="uppercase font-mono tracking-wider text-xs placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
                />
                {promoCode.length > 0 && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-success absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>
              <p className="mt-1 text-[11px] text-muted">All capital, max 8 characters</p>
            </div>

            {/* Referral Code Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-text" htmlFor="referralCode">
                  <Users className="w-3.5 h-3.5 text-accent" />
                  Referral code
                </label>
                <span className="text-[10px] text-muted">Optional</span>
              </div>
              <div className="relative">
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="e.g. FRIEND2026"
                  value={referralCode}
                  onChange={(e) => handleReferralChange(e.target.value)}
                  className="text-xs"
                />
                {referralCode.length > 0 && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-success absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}
              </div>
              <p className="mt-1 text-[11px] text-muted">Invited by a colleague or partner</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full mt-3"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
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

      {/* Google Signup Button at the bottom */}
      <GoogleAuthButton
        onClick={handleGoogleSignup}
        isLoading={isGoogleLoading}
        text="Sign up with Google"
      />

      {/* Footer Navigation */}
      <div className="text-center text-xs text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
