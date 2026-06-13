"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

type Command = {
  label: string
  shortcut?: string
  action: () => void
  category: string
}

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const commands: Command[] = [
    {
      category: "Navigate",
      label: "View Work",
      action: () => { router.push("/work"); setOpen(false) },
    },
    {
      category: "Navigate",
      label: "Systems Page",
      action: () => { router.push("/systems"); setOpen(false) },
    },
    {
      category: "Navigate",
      label: "Lab & Experiments",
      action: () => { router.push("/lab"); setOpen(false) },
    },
    {
      category: "Navigate",
      label: "About Rishi",
      action: () => { router.push("/about"); setOpen(false) },
    },
    {
      category: "Projects",
      label: "View Retrieval Engine",
      action: () => { router.push("/work/multilingual-multimodal-retrieval"); setOpen(false) },
    },
    {
      category: "Projects",
      label: "View Agent Platform",
      action: () => { router.push("/work/ai-software-delivery-control-tower"); setOpen(false) },
    },
    {
      category: "Projects",
      label: "View LLM Copilot",
      action: () => { router.push("/work/cost-aware-llm-support-copilot"); setOpen(false) },
    },
    {
      category: "Links",
      label: "Open GitHub",
      shortcut: "G",
      action: () => { window.open("https://github.com/RishDevs", "_blank"); setOpen(false) },
    },
    {
      category: "Links",
      label: "Open LinkedIn",
      shortcut: "L",
      action: () => { window.open("https://linkedin.com/in/rishi-kolluru", "_blank"); setOpen(false) },
    },
    {
      category: "Links",
      label: "Open Resume",
      shortcut: "R",
      action: () => { router.push("/resume"); setOpen(false) },
    },
    {
      category: "Links",
      label: "Email Rishi",
      shortcut: "E",
      action: () => { window.open("mailto:rishikolluru.work@gmail.com"); setOpen(false) },
    },
    {
      category: "Links",
      label: "Copy Email",
      action: () => { navigator.clipboard.writeText("rishikolluru.work@gmail.com"); setOpen(false) },
    },
  ]

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {})

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] backdrop-blur-sm"
            style={{ background: "rgba(2,10,25,0.8)" }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#07111F", border: "1px solid #1A2D44" }}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: "#1A2D44" }}>
              <span style={{ color: "#6DEBFF" }}>⌘</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#F5F7FA", fontFamily: "var(--font-mono-custom), monospace" }}
              />
              <kbd
                className="text-xs px-2 py-1 rounded"
                style={{ background: "#1A2D44", color: "#A7B0C0", fontFamily: "monospace" }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, cmds]) => (
                <div key={category}>
                  <p
                    className="px-4 py-2 text-xs font-mono uppercase tracking-widest"
                    style={{ color: "#A7B0C0" }}
                  >
                    {category}
                  </p>
                  {cmds.map((cmd) => (
                    <button
                      key={cmd.label}
                      onClick={cmd.action}
                      className="w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors"
                      style={{ color: "#F5F7FA" }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "rgba(109,235,255,0.07)"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "transparent"
                      }}
                    >
                      {cmd.label}
                      {cmd.shortcut && (
                        <kbd
                          className="text-xs px-2 py-0.5 rounded font-mono"
                          style={{ background: "#1A2D44", color: "#6DEBFF" }}
                        >
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-sm text-center" style={{ color: "#A7B0C0" }}>
                  No commands found
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
