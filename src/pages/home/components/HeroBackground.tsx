export function HeroBackground() {
  return (
    <>
      {/* Subtle Radial Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Top Centered Theme Glow Orb */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[750px] rounded-full blur-[130px] opacity-25 pointer-events-none animate-pulse-subtle"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
    </>
  )
}
