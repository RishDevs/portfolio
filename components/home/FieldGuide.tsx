"use client"

import Link from "next/link"
import { Reveal } from "@/components/Reveal"

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
    desc: "Timeline, experience, skills by capability, and a recruiter-ready profile.",
    page: "Résumé",
    href: "/resume",
  },
]

export function FieldGuide() {
  return (
    <section className="paper section-pad border-t-2 border-[var(--color-ink)]">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="spec text-[var(--color-vermillion)]">
              § 03 — Field Guide
            </p>
            <h2 className="display-serif mt-4 text-[clamp(2.4rem,6vw,5rem)]">
              Three ways
              <br />
              <span className="italic">to read this.</span>
            </h2>
            <p className="mt-6 max-w-sm text-ink-soft">
              This isn&apos;t a résumé page — it&apos;s a working journal of an
              AI systems engineer. Pick a path through it.
            </p>
          </div>

          {/* table of contents */}
          <div className="border-t border-[var(--color-ink)]">
            {MODES.map((m, i) => (
              <Reveal key={m.no} delay={i * 80}>
                <Link
                  href={m.href}
                  data-cursor
                  className="group flex items-center gap-5 border-b border-[var(--color-rule)] py-7"
                >
                  <span className="index-num text-sm text-ink-faint transition-colors group-hover:text-[var(--color-vermillion)]">
                    {m.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="display-lg text-ink transition-transform group-hover:translate-x-1">
                        {m.mode}
                      </h3>
                      <span
                        className="hidden flex-1 self-end border-b border-dotted border-[var(--color-rule)] sm:block"
                        aria-hidden
                      />
                      <span className="hidden shrink-0 spec text-ink-soft transition-colors group-hover:text-ink sm:inline">
                        → {m.page}
                      </span>
                    </div>
                    <p className="mt-2 max-w-[48ch] text-sm text-ink-soft">
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
