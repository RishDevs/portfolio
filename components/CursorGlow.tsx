"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorGlow() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const isHoveringLink = useRef(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isHoveringLink.current = !!(target.closest("a") || target.closest("button"))
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", checkHover)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", checkHover)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(109,235,255,0.04) 0%, transparent 70%)",
        }}
      />
      {/* Small sharp cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          background: "#6DEBFF",
        }}
      />
    </>
  )
}
