"use client"

import { useRef, type ReactNode } from "react"

export function Marquee({
  children,
  speed = 40,
  className = "",
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={`group relative flex overflow-hidden ${className}`}
      onMouseEnter={() => {
        const t = ref.current?.querySelectorAll<HTMLElement>(".marquee-track")
        t?.forEach((e) => (e.style.animationPlayState = "paused"))
      }}
      onMouseLeave={() => {
        const t = ref.current?.querySelectorAll<HTMLElement>(".marquee-track")
        t?.forEach((e) => (e.style.animationPlayState = "running"))
      }}
    >
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
      </div>
      <div
        className="marquee-track flex shrink-0 items-center"
        aria-hidden
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
      </div>
    </div>
  )
}
