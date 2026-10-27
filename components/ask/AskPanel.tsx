"use client"

import { useEffect, useRef } from "react"
import { AskChat } from "./AskChat"
import s from "./ask.module.css"

/** Modal panel opened from "Ask my spidey sense" on the main page. Loaded lazily. */
export default function AskPanel({ onClose }: { onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    box.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return }
      if (e.key !== "Tab" || !box.current) return
      // Keep keyboard focus inside the dialog.
      const items = [...box.current.querySelectorAll<HTMLElement>("button:not([disabled]), textarea, a[href]")]
      if (!items.length) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <div className={s.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={box} className={s.panel} role="dialog" aria-modal="true" aria-labelledby="ask-title">
        <AskChat onClose={onClose} titleId="ask-title" />
      </div>
    </div>
  )
}
