"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const lines = [
  "Initializing retrieval system...",
  "Loading agent memory...",
  "Indexing projects...",
  "Rishi Kolluru",
  "AI Systems Engineer",
]

export function PreloaderExperience() {
  const [show, setShow] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem("preloader-seen")
    if (seen) return
    setShow(true)

    let line = 0
    const lineInterval = setInterval(() => {
      line++
      setCurrentLine(line)
      setProgress((line / lines.length) * 100)
      if (line >= lines.length) {
        clearInterval(lineInterval)
        setTimeout(() => {
          setDone(true)
          setTimeout(() => {
            setShow(false)
            sessionStorage.setItem("preloader-seen", "1")
          }, 600)
        }, 500)
      }
    }, 380)

    return () => clearInterval(lineInterval)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "#020A19" }}
        >
          {/* Scan line */}
          <motion.div
            initial={{ top: "-2px" }}
            animate={{ top: "100vh" }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="absolute left-0 w-full h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(109,235,255,0.4), transparent)" }}
          />

          <div className="w-full max-w-lg px-8">
            {/* Logo mark */}
            <div className="mb-12">
              <span className="text-label" style={{ color: "#6DEBFF" }}>RK.SYS</span>
            </div>

            {/* Lines */}
            <div className="space-y-3 mb-12 min-h-[8rem]">
              {lines.slice(0, currentLine).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={
                    i === lines.length - 2
                      ? "text-2xl font-bold tracking-tight"
                      : i === lines.length - 1
                      ? "text-label"
                      : "font-mono text-sm"
                  }
                  style={{
                    color: i >= lines.length - 2 ? "#F5F7FA" : "#A7B0C0",
                    fontFamily: i < lines.length - 2 ? "var(--font-mono-custom), monospace" : undefined,
                  }}
                >
                  {i < lines.length - 2 && (
                    <span style={{ color: "#B8FF3D", marginRight: "0.5rem" }}>›</span>
                  )}
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full h-px rounded-full overflow-hidden" style={{ background: "#1A2D44" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6DEBFF, #B8FF3D)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
