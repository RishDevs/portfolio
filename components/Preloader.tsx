"use client"

import { useEffect, useState } from "react"

const LINES = [
  "Initializing retrieval system",
  "Loading agent memory",
  "Indexing projects",
  "Warming embedding cache",
]

export function Preloader() {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [count, setCount] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [skip, setSkip] = useState<boolean | null>(null)

  useEffect(() => {
    const seen = sessionStorage.getItem("rk_preloaded")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (seen || reduce) {
      setSkip(true)
      setDone(true)
      setHidden(true)
      return
    }
    setSkip(false)
    document.body.style.overflow = "hidden"

    let raf = 0
    const start = performance.now()
    const DUR = 2100
    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      setLineIdx(Math.min(LINES.length - 1, Math.floor(eased * LINES.length)))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDone(true)
        sessionStorage.setItem("rk_preloaded", "1")
        setTimeout(() => {
          setHidden(true)
          document.body.style.overflow = ""
        }, 850)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ""
    }
  }, [])

  if (skip === null) {
    // SSR + first frame: render opaque cover to avoid flash, hide instantly if skipping
    return (
      <div className="fixed inset-0 z-[300] bg-[var(--color-bg)]" aria-hidden />
    )
  }
  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col justify-between bg-[var(--color-bg)] px-[clamp(1.25rem,5vw,5rem)] py-10"
      style={{
        transform: done ? "translateY(-101%)" : "none",
        transition: "transform 0.85s cubic-bezier(0.83,0,0.17,1)",
      }}
      aria-hidden
    >
      <div className="flex items-center justify-between">
        <span className="label-sm text-faint">RK · AI SYSTEMS</span>
        <span className="label-sm text-faint">Buffalo, NY</span>
      </div>

      <div className="flex flex-col gap-6">
        <div className="font-mono text-sm text-muted">
          <span className="text-green">›</span>{" "}
          {LINES[lineIdx]}
          <span className="ml-1 animate-pulse">_</span>
        </div>
        <div className="display-xl text-text">
          Rishi Kolluru
        </div>
        <div className="label text-muted">AI Systems Engineer</div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <div className="h-px w-full bg-[var(--color-line)]">
            <div
              className="h-px bg-green"
              style={{ width: `${count}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </div>
        <span className="font-mono text-4xl tabular-nums text-text md:text-6xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  )
}
