"use client"

import Link from "next/link"
import { Reveal, RevealLines } from "@/components/Reveal"

const MODES = [
  {
    no: "01",
    mode: "Build Mode",
    desc: "Projects, demos, engineering proof, and the systems I ship.",
    page: "Work",
    href: "/work",
  },
  {
    no: "02",
    mode: "Research Mode",
    desc: "Experiments, benchmarks, failures, and notes from building in public.",
    page: "Lab",
    href: "/lab",
  },
  {
    no: "03",
    mode: "Career Mode",
    desc: "Timeline, education, experience, and skills grouped by system capability.",
    page: "About",
    href: "/about",
  },
]

export function FieldGuide() {
  return (
    <section className="section-pad relative border-y border-[var(--color-line)] bg-[var(--color-surface)]">
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 0%, rgba(45,125,255,0.12), transparent 60%), radial-gradient(60% 60% at 100% 100%, rgba(255,45,69,0.1), transparent 60%)",
        }}
      />
      <div className="wrap relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="label mb-5 text-[var(--color-magenta)]">/ 04 — Field Guide</p>
            <RevealLines
              className="display-xl"
              lines={["Three ways", "to read this."]}
            />
            <p className="mt-6 max-w-sm text-muted">
              This isn&apos;t a résumé page — it&apos;s a working journal of an
              AI research engineer. Pick a path through it.
            </p>
          </div>

          <div className="border-t border-[var(--color-line)]">
            {MODES.map((m, i) => (
              <Reveal key={m.no} delay={i * 80}>
                <Link
                  href={m.href}
                  data-cursor
                  className="group flex items-center gap-5 border-b border-[var(--color-line)] py-7 transition-colors hover:bg-[var(--color-surface-2)]/40"
                >
                  <span className="font-mono text-sm text-faint transition-colors group-hover:text-[var(--color-magenta)]">
                    {m.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="display-lg transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-magenta)]">
                        {m.mode}
                      </h3>
                      <span
                        className="hidden flex-1 self-end border-b border-dotted border-[var(--color-line-2)] sm:block"
                        aria-hidden
                      />
                      <span className="hidden shrink-0 font-mono text-xs uppercase tracking-widest text-muted transition-colors group-hover:text-text sm:inline">
                        → {m.page}
                      </span>
                    </div>
                    <p className="mt-2 max-w-[48ch] text-sm text-muted">
                      {m.desc}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
