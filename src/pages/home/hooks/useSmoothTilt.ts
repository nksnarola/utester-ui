import { useRef, useState, useEffect, useCallback } from "react"

interface UseSmoothTiltOptions {
  maxTilt?: number
  hoverDamping?: number
  idleDamping?: number
}

/**
 * Custom hook for silky-smooth 3D card tilt and specular glare.
 *
 * Uses requestAnimationFrame with frame-rate independent exponential damping (LERP),
 * updating DOM styles directly to avoid React re-render thrashing during pointer movement.
 * Smoothly transitions between continuous ambient Lissajous oscillation (idle) and
 * high-precision cursor-tracking tilt (hovered).
 */
export function useSmoothTilt({
  maxTilt = 14,
  hoverDamping = 9.0,
  idleDamping = 4.0,
}: UseSmoothTiltOptions = {}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Internal animation state kept in refs for 60-120fps direct DOM manipulation
  const isHoveredRef = useRef(false)
  const rafId = useRef<number | null>(null)
  const lastTimestamp = useRef<number | null>(null)
  const idleElapsed = useRef(0)

  // Current interpolated values
  const currentRx = useRef(6)
  const currentRy = useRef(-6)
  const currentGx = useRef(50)
  const currentGy = useRef(50)

  // Target values
  const targetRx = useRef(6)
  const targetRy = useRef(-6)
  const targetGx = useRef(50)
  const targetGy = useRef(50)

  // Track if user prefers reduced motion
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    mediaQuery.addEventListener("change", handleMotionChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimestamp.current === null) {
        lastTimestamp.current = timestamp
      }

      // Delta time in seconds, capped to prevent jumps after tab switching
      const dt = Math.min((timestamp - lastTimestamp.current) / 1000, 0.1)
      lastTimestamp.current = timestamp

      if (prefersReducedMotion.current) {
        if (cardRef.current) {
          cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)"
          cardRef.current.style.setProperty("--glare-x", "50%")
          cardRef.current.style.setProperty("--glare-y", "50%")
        }
        rafId.current = requestAnimationFrame(animate)
        return
      }

      if (!isHoveredRef.current) {
        // Continuous organic Lissajous curve for ambient 3D breathing
        idleElapsed.current += dt
        const t = idleElapsed.current
        targetRx.current = 3 + Math.sin(t * 0.75) * 5
        targetRy.current = Math.cos(t * 0.5) * 8
        targetGx.current = 50 + Math.cos(t * 0.5) * 22
        targetGy.current = 50 + Math.sin(t * 0.75) * 22
      }

      // Exponential damping (LERP): frame-rate independent buttery smooth tracking
      const rate = isHoveredRef.current ? hoverDamping : idleDamping
      const factor = 1 - Math.exp(-rate * dt)

      currentRx.current += (targetRx.current - currentRx.current) * factor
      currentRy.current += (targetRy.current - currentRy.current) * factor
      currentGx.current += (targetGx.current - currentGx.current) * factor
      currentGy.current += (targetGy.current - currentGy.current) * factor

      // Update card element directly via transform and CSS variables
      if (cardRef.current) {
        cardRef.current.style.transform = `rotateX(${currentRx.current.toFixed(2)}deg) rotateY(${currentRy.current.toFixed(2)}deg) translateZ(10px)`
        cardRef.current.style.setProperty("--glare-x", `${currentGx.current.toFixed(1)}%`)
        cardRef.current.style.setProperty("--glare-y", `${currentGy.current.toFixed(1)}%`)
      }

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [hoverDamping, idleDamping])

  const updateTargetFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()

      // Normalized coordinates: -1 (left/top) to +1 (right/bottom)
      const nx = ((clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((clientY - rect.top) / rect.height - 0.5) * 2

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, nx))
      const clampedY = Math.max(-1, Math.min(1, ny))

      targetRx.current = -clampedY * maxTilt
      targetRy.current = clampedX * maxTilt

      // Glare position in percentages (0% to 100%)
      targetGx.current = ((clientX - rect.left) / rect.width) * 100
      targetGy.current = ((clientY - rect.top) / rect.height) * 100
    },
    [maxTilt]
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      isHoveredRef.current = true
      setIsHovered(true)
      updateTargetFromPointer(e.clientX, e.clientY)
    },
    [updateTargetFromPointer]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateTargetFromPointer(e.clientX, e.clientY)
    },
    [updateTargetFromPointer]
  )

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false
    setIsHovered(false)
  }, [])

  return {
    cardRef,
    isHovered,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  }
}
