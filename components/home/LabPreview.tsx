"use client"

import Link from "next/link"
import { labEntries } from "@/lib/lab"
import { Reveal, RevealLines } from "@/components/Reveal"

const STATUS_COLOR: Record<string, string> = {
  shipped: "var(--color-green)",
  testing: "var(--color-cyan)",
  learning: "var(--color-violet)",
  failed: "var(--color-error)",
}

export function LabPreview() {
  const entries = labEntries.slice(0, 5)
  return (
    <section className="section-pad relative border-t border-[var(--color-line)] bg-[var(--color-surface)]" id="lab">
      <div className="wrap">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-5">§ 05 — Field Logs</p>
            <RevealLines
              className="display-xl max-w-[16ch]"
              lines={["A live archive of", "experiments & notes."]}
            />
          </div>
          <Link
            href="/lab"
            className="link-underline shrink-0 font-mono text-sm uppercase tracking-widest text-muted hover:text-text"
            data-cursor
          >
            All entries →
          </Link>
        </div>

        <div className="flex flex-col border-t border-[var(--color-line)]">
          {entries.map((e, i) => (
            <Reveal key={e.id} delay={i * 50}>
              <Link
                href="/lab"
                data-cursor
                className="group grid items-center gap-4 border-b border-[var(--color-line)] py-6 transition-colors hover:bg-[var(--color-surface-2)]/40 md:grid-cols-[auto_1fr_auto] md:gap-8 md:px-4"
              >
                <span className="font-mono text-xs text-faint md:w-20">
                  {e.date}
                </span>
                <div>
                  <h3 className="text-lg font-medium transition-colors group-hover:text-green md:text-xl">
                    {e.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{e.insight}</p>
                </div>
                <div className="flex items-center gap-4">
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
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
