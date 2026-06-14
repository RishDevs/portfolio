"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>*#@%-_"

/**
 * New-gen "decode" effect: text resolves from random glyphs.
 * Runs once when scrolled into view; re-runs on hover.
 */
export function Scramble({
  text,
  className = "",
  as: Tag = "span",
  speed = 26,
}: {
  text: string
  className?: string
  as?: "span" | "div" | "p"
  speed?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef(0)
  const playedRef = useRef(false)

  const run = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setDisplay(text)
      return
    }
    cancelAnimationFrame(raf.current)
    frame.current = 0
    const total = text.length
    const tick = () => {
      const progress = frame.current / speed
      const revealed = Math.floor(progress * total)
      let out = ""
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") {
          out += " "
        } else if (i < revealed) {
          out += text[i]
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setDisplay(out)
      frame.current++
      if (revealed < total) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    tick()
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !playedRef.current) {
            playedRef.current = true
            run()
          }
        })
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      onMouseEnter={run}
    >
      {display}
    </Tag>
  )
}
