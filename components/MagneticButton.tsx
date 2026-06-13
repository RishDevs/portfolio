"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: "primary" | "secondary" | "ghost"
}

export function MagneticButton({ children, className, onClick, href, variant = "primary" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.25
    const dy = (e.clientY - cy) * 0.25
    setPosition({ x: dx, y: dy })
  }

  function onMouseLeave() {
    setPosition({ x: 0, y: 0 })
  }

  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-sm cursor-pointer select-none transition-colors",
    variant === "primary" && "bg-accent-green text-bg hover:bg-accent-cyan",
    variant === "secondary" && "border border-border text-text hover:border-accent-cyan hover:text-accent-cyan",
    variant === "ghost" && "text-muted hover:text-text",
    className
  )

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={baseClass}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    )
  }

  return inner
}
