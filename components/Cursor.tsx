"use client"

import { useEffect, useRef } from "react"

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    document.documentElement.classList.add("cursor-enabled")

    const dot = dotRef.current!
    const ring = ringRef.current!
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`

      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, [data-cursor], input, textarea, [role="button"]'
      )
      ring.dataset.variant = interactive ? "hover" : "default"
    }

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16
      ringPos.y += (mouse.y - ringPos.y) * 0.16
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(render)
    }

    const onLeave = () => {
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }
    const onEnter = () => {
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    raf = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove("cursor-enabled")
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}
