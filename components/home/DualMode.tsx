"use client"

import Link from "next/link"

const PANELS = [
  {
    tag: "On Systems",
    title: "Production AI engineering",
    body: "Retrieval, agents, APIs, latency, guardrails. The systems that have to actually work — measured, observable, and shipped.",
    href: "/systems",
    cta: "Explore systems",
    accent: "var(--color-green)",
  },
  {
    tag: "Off Systems",
    title: "Learning in public",
    body: "Build logs, research notes, benchmarks, and failures. The experiments and foundations behind the production work.",
    href: "/lab",
    cta: "Enter the lab",
    accent: "var(--color-violet)",
  },
]

export function DualMode() {
  return (
    <section className="relative grid md:grid-cols-2" aria-label="On systems / Off systems">
      {PANELS.map((p, i) => (
        <Link
          key={p.tag}
          href={p.href}
          data-cursor
          className={`group relative flex min-h-[60vh] flex-col justify-between overflow-hidden p-8 transition-colors duration-500 md:p-14 ${
            i === 0
              ? "border-b border-[var(--color-line)] md:border-b-0 md:border-r"
              : ""
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(80% 80% at 50% 100%, ${p.accent}22, transparent 70%)`,
            }}
          />
          <div className="relative flex items-center justify-between">
            <p className="label" style={{ color: p.accent }}>
              {p.tag}
            </p>
            <span className="font-mono text-sm text-faint">
              0{i + 1}
            </span>
          </div>

          <div className="relative">
            <h3 className="display-xl max-w-[14ch]">{p.title}</h3>
            <p className="mt-6 max-w-[44ch] text-muted">{p.body}</p>
            <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors group-hover:text-text">
              {p.cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}
    </section>
  )
}
