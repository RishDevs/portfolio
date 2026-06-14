"use client"

import { useMemo, useState } from "react"
import { labEntries } from "@/lib/lab"
import { Reveal } from "@/components/Reveal"

const STATUS_COLOR: Record<string, string> = {
  shipped: "var(--color-blue)",
  testing: "var(--color-red)",
}

const FILTERS = ["All", "shipped", "testing"]

export function LabGrid() {
  const [filter, setFilter] = useState("All")

  const entries = useMemo(() => {
    if (filter === "All") return labEntries
    return labEntries.filter((e) => e.status === filter)
  }, [filter])

  return (
    <section className="wrap pb-32">
      <div className="mb-10 flex flex-wrap gap-2 border-y border-[var(--color-line)] py-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            data-cursor
            className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              filter === f
                ? "border-green bg-green/10 text-green"
                : "border-[var(--color-line)] text-muted hover:text-text"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((e, i) => (
          <Reveal key={e.id} delay={i * 50}>
            <article className="card group flex h-full flex-col p-7 transition-colors hover:border-[var(--color-line-2)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-faint">{e.date}</span>
                <span
                  className="label-sm flex items-center gap-2"
                  style={{ color: STATUS_COLOR[e.status] }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: STATUS_COLOR[e.status] }}
                  />
                  {e.status}
                </span>
              </div>
              <p className="label-sm mt-6 text-faint">{e.category}</p>
              <h2 className="mt-3 text-xl font-medium leading-snug transition-colors group-hover:text-green">
                {e.title}
              </h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                {e.insight}
              </p>
              <div className="mt-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3">
                <p className="font-mono text-xs text-green">{e.metric}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
