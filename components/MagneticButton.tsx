"use client"

import Link from "next/link"
import { useRef, type ReactNode, type MouseEvent } from "react"

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
  external?: boolean
}

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  external = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = "translate(0, 0)"
  }

  const inner = (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
      className={className}
    >
      {children}
    </span>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      )
    }
    return <Link href={href}>{inner}</Link>
  }

  return (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  )
}
