"use client"

import Link from "next/link"
import { projects } from "@/lib/projects"
import { Reveal } from "@/components/Reveal"
import { Scramble } from "@/components/Scramble"

const GRADIENTS = [
  "radial-gradient(120% 120% at 20% 20%, #6debff, transparent 55%), radial-gradient(120% 120% at 85% 80%, #8c6cff, transparent 55%), #07060a",
  "radial-gradient(120% 120% at 80% 20%, #c6f24e, transparent 55%), radial-gradient(120% 120% at 20% 90%, #e5533d, transparent 60%), #07060a",
  "radial-gradient(120% 120% at 30% 80%, #8c6cff, transparent 55%), radial-gradient(120% 120% at 80% 10%, #c6f24e, transparent 55%), #07060a",
]

export function FeaturedWork() {
  return (
    <section className="paper section-pad" id="work">
      <div className="wrap">
        {/* masthead */}
        <div className="rule mb-5" />
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="spec text-[var(--color-vermillion)]">
              § 01 — Selected Works
            </p>
            <h2 className="display-serif mt-4 text-[clamp(2.6rem,8vw,7rem)]">
              Field notes from
              <br />
              <span className="italic">building systems.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="link-underline shrink-0 spec text-ink-soft hover:text-ink"
            data-cursor
          >
            Full index →
          </Link>
        </div>

        {/* catalog rows */}
        <div className="border-t border-[var(--color-ink)]">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link
                href={`/work/${p.slug}`}
                data-cursor
                className="group grid grid-cols-1 items-center gap-6 border-b border-[var(--color-rule)] py-8 transition-colors md:grid-cols-[4rem_1.4fr_auto] md:gap-10"
              >
                <span className="index-num text-3xl text-ink-faint transition-colors group-hover:text-[var(--color-vermillion)] md:text-4xl">
                  {p.number}
                </span>

                <div>
                  <h3 className="display-lg text-ink transition-all group-hover:translate-x-1">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-[56ch] text-sm text-ink-soft">
                    {p.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="chip-ink">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* flash preview */}
                  <div
                    className="relative hidden h-24 w-40 shrink-0 overflow-hidden rounded-md border border-[var(--color-ink)] lg:block"
                    style={{ background: GRADIENTS[i % 3] }}
                  >
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <span className="absolute bottom-1.5 left-2 font-mono text-[0.55rem] uppercase tracking-widest text-white/80">
                      {p.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <Scramble
                      text={p.mainMetric}
                      as="p"
                      className="font-display text-lg font-medium text-ink"
                    />
                    <span className="mt-2 inline-flex items-center gap-1 spec text-ink-soft transition-colors group-hover:text-[var(--color-vermillion)]">
                      Open
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
