import type { ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { useIsDarkMode } from "@/hooks/useIsDarkMode"

export interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /**
   * "full" displays the complete logo with emblem and wordmark.
   * "icon" displays only the shield emblem.
   */
  variant?: "full" | "icon"
}

export function Logo({
  variant = "full",
  className,
  alt = "UTester",
  ...props
}: LogoProps) {
  const isDark = useIsDarkMode()

  const src = isDark
    ? variant === "icon"
      ? "/images/logo/utester-logo-dark-icon.png"
      : "/images/logo/utester-logo-dark.png"
    : variant === "icon"
      ? "/images/logo/utester-logo-light-icon.png"
      : "/images/logo/utester-logo-light.png"

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={cn("object-contain select-none transition-opacity duration-150", className)}
      {...props}
    />
  )
}
