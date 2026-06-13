"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

export function RevealText({ children, className, delay = 0, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-10%" })

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.19, 1, 0.22, 1],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: i * staggerDelay,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {child}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
