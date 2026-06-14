"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { site } from "@/lib/site"

type Item = {
  label: string
  hint?: string
  group: string
  run: () => void
  keywords?: string
}

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      setOpen(false)
      router.push(href)
    }
    const ext = (href: string) => () => {
      window.open(href, "_blank", "noopener,noreferrer")
      setOpen(false)
    }
    return [
      { label: "Home", group: "Navigate", run: go("/") },
      { label: "Work", group: "Navigate", run: go("/work") },
      { label: "Systems", group: "Navigate", run: go("/systems") },
      { label: "Lab", group: "Navigate", run: go("/lab") },
      { label: "About", group: "Navigate", run: go("/about") },
      { label: "Contact", group: "Navigate", run: go("/contact") },
      {
        label: "Multilingual Retrieval Engine",
        group: "Projects",
        keywords: "vit faiss retrieval multimodal",
        run: go("/work/multilingual-multimodal-retrieval"),
      },
      {
        label: "AI Software Delivery Control Tower",
        group: "Projects",
        keywords: "agents multi-agent orchestration",
        run: go("/work/ai-software-delivery-control-tower"),
      },
      {
        label: "Cost-Aware LLM Support Copilot",
        group: "Projects",
        keywords: "rag routing pgvector redis",
        run: go("/work/cost-aware-llm-support-copilot"),
      },
      {
        label: "Open GitHub",
        hint: "@RishDevs",
        group: "Links",
        run: ext(site.github),
      },
      {
        label: "Open LinkedIn",
        hint: "/rishi-kolluru",
        group: "Links",
        run: ext(site.linkedin),
      },
      {
        label: "Email Rishi",
        hint: site.email,
        group: "Contact",
        run: ext(`mailto:${site.email}`),
      },
      {
        label: "Copy Email",
        group: "Contact",
        run: () => {
          navigator.clipboard?.writeText(site.email)
          setOpen(false)
        },
      },
    ]
  }, [router])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) =>
      (i.label + " " + (i.keywords ?? "") + " " + i.group)
        .toLowerCase()
        .includes(q)
    )
  }, [items, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-command-menu", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-command-menu", onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      filtered[active]?.run()
    }
  }

  if (!open) return null

  let lastGroup = ""

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-[rgba(2,8,18,0.7)] backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--color-line-2)] bg-[var(--color-surface)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onListKey}
      >
        <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-4">
          <span className="font-mono text-sm text-green">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, links, pages…"
            className="w-full bg-transparent py-4 text-sm text-text outline-none placeholder:text-faint"
          />
          <kbd className="font-mono text-[0.65rem] text-faint">ESC</kbd>
        </div>
        <div className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-faint">
              No matches.
            </p>
          )}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup
            lastGroup = item.group
            return (
              <div key={item.label}>
                {showGroup && (
                  <p className="label-sm px-3 pb-1 pt-3 text-faint">
                    {item.group}
                  </p>
                )}
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => item.run()}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    active === i
                      ? "bg-[var(--color-surface-2)] text-text"
                      : "text-muted"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hint && (
                    <span className="font-mono text-xs text-faint">
                      {item.hint}
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
