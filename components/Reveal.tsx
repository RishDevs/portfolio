"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Generic scroll reveal. Adds `is-in` when the element enters the viewport.
 * Pair with the `[data-reveal]` CSS in globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.transitionDelay = `${delay}ms`
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  )
}

/**
 * Headline reveal that splits text into masked lines.
 * Each line clips and slides up with a stagger.
 */
export function RevealLines({
  lines,
  className = "",
  lineClassName = "",
}: {
  lines: string[]
  className?: string
  lineClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = Array.from(
              entry.target.querySelectorAll<HTMLElement>(".reveal-line")
            )
            children.forEach((c, i) => {
              const inner = c.firstElementChild as HTMLElement | null
              if (inner) inner.style.transitionDelay = `${i * 90}ms`
              c.classList.add("is-in")
            })
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`reveal-line ${lineClassName}`}>
          <span>{line}</span>
        </span>
      ))}
    </div>
  )
}
