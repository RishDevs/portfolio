"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { projects, repos } from "@/lib/projects"
import { Reveal } from "@/components/Reveal"

const FILTERS = [
  "All",
  "Retrieval",
  "LLM Systems",
  "Agents",
  "Deep Learning",
  "Infrastructure",
]

export function WorkIndex() {
  const [filter, setFilter] = useState("All")

  const filtered = useMemo(() => {
    if (filter === "All") return projects
    return projects.filter((p) => p.categories.includes(filter))
  }, [filter])

  return (
    <section className="wrap pb-32">
      {/* filters */}
      <div className="sticky top-[68px] z-30 -mx-2 mb-10 flex flex-wrap gap-2 border-b border-[var(--color-line)] bg-[var(--color-bg)]/85 px-2 py-4 backdrop-blur-md">
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

      {/* project rows */}
      <div className="flex flex-col border-t border-[var(--color-line)]">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={i * 60}>
            <Link
              href={`/work/${p.slug}`}
              data-cursor
              className="group relative grid items-center gap-5 overflow-hidden border-b border-[var(--color-line)] py-8 transition-all duration-500 hover:bg-[var(--color-surface)]/60 hover:pl-4 md:grid-cols-[5rem_1fr_auto] md:gap-10 md:px-3 md:hover:pl-6"
            >
              <span
                className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 bg-[var(--color-blue)] transition-all duration-500 group-hover:h-3/4"
                aria-hidden
              />
              <span className="font-mono text-lg text-faint transition-colors group-hover:text-[var(--color-blue)]">
                {p.number}
              </span>
              <div>
                <h2 className="display-lg max-w-[20ch] transition-colors group-hover:text-green">
                  {p.title}
                </h2>
                <p className="mt-2 max-w-[60ch] text-sm text-muted">
                  {p.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <span className="chip border-[var(--color-line-2)] text-green">
                  {p.mainMetric}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {p.category}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-text">
                  Open
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* more on github */}
      <div className="mt-24">
        <div className="mb-8 flex items-center gap-4">
          <span className="label">More on GitHub</span>
          <span className="h-px flex-1 bg-[var(--color-line)]" />
          <a
            href="https://github.com/RishDevs"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-xs uppercase tracking-widest text-muted hover:text-text"
            data-cursor
          >
            @RishDevs ↗
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {repos.map((r, i) => (
            <Reveal key={r.name} delay={i * 50}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="card group flex h-full flex-col p-6 transition-colors hover:border-[var(--color-line-2)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-faint">
                    {r.name}
                  </span>
                  <span className="font-mono text-xs text-faint">{r.year}</span>
                </div>
                <h3 className="mt-4 text-xl font-medium transition-colors group-hover:text-green">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {r.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {r.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors group-hover:text-text">
                  View repo
                  <span className="transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
