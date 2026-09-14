/**
 * Authentication Form Validation Utilities
 */

export function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) {
    return "Full name is required"
  }
  if (trimmed.length < 2) {
    return "Name must be at least 2 characters"
  }
  return null
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) {
    return "Email address is required"
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address"
  }
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long"
  }
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    return "Password must contain at least one letter and one number"
  }
  return null
}

export function validateLoginPassword(password: string): string | null {
  if (!password) {
    return "Password is required"
  }
  return null
}

/**
 * Normalizes promo code: strictly uppercase alphanumeric and max 8 characters
 */
export function formatPromoCode(code: string): string {
  if (!code) return ""
  return code
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8)
}

/**
 * Normalizes referral code: trims whitespace and limits length
 */
export function formatReferralCode(code: string): string {
  if (!code) return ""
  return code.trim().slice(0, 32)
}
