"use client"

import { Reveal } from "@/components/Reveal"

type Item = {
  year: string
  title: string
  place: string
  body: string
  tag: string
  anchor?: boolean
}

const ITEMS: Item[] = [
  {
    year: "2021",
    title: "B.Tech CSE — where it begins",
    place: "Institute of Aeronautical Engineering (IARE)",
    body: "Started Computer Science & Engineering. Foundations in algorithms, systems, and the math behind machine learning.",
    tag: "Education · Origin",
    anchor: true,
  },
  {
    year: "2023",
    title: "Software Engineering Intern",
    place: "Pullulate Pvt. Ltd. — Data & ML",
    body: "Built scalable Python data ingestion & validation pipelines and REST APIs exposing model inference and evaluation metrics.",
    tag: "Data engineering · APIs",
  },
  {
    year: "2023",
    title: "Analytics Lead, CETA",
    place: "IARE Campus",
    body: "Designed automated dashboards and reproducible analysis pipelines; ran controlled experiments to measure uplift.",
    tag: "Experimentation",
  },
  {
    year: "2025",
    title: "MS Computer Science — the leap",
    place: "University at Buffalo (SUNY)",
    body: "Began graduate study in CSE, deepening representation learning, retrieval, and LLM systems at research depth.",
    tag: "Education · Milestone",
    anchor: true,
  },
  {
    year: "2026",
    title: "Three production-grade systems",
    place: "Retrieval · Agents · RAG",
    body: "Shipped a multimodal retrieval engine, a 6-agent delivery platform, and a cost-aware LLM copilot.",
    tag: "AI systems builder",
  },
]

export function Timeline() {
  return (
    <section className="paper section-pad border-t-2 border-[var(--color-ink)]" id="timeline">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="spec text-[var(--color-vermillion)]">§ 04 — The Record</p>
            <h2 className="display-serif mt-4 text-[clamp(2.4rem,7vw,6rem)]">
              From B.Tech
              <br />
              <span className="italic">to MS, and shipping.</span>
            </h2>
          </div>
          <p className="max-w-xs spec text-ink-soft">
            The line begins at B.Tech ’21 and runs through MS ’25 — every entry a
            step toward building systems.
          </p>
        </div>

        <div className="border-t border-[var(--color-ink)]">
          {ITEMS.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className={`group grid gap-4 border-b border-[var(--color-rule)] py-8 md:grid-cols-[7rem_1fr] md:gap-12 md:py-9 ${
                  item.anchor ? "bg-[var(--color-paper-2)]/60" : ""
                }`}
              >
                <div className="flex items-start gap-3 md:justify-end md:pr-8">
                  {item.anchor && (
                    <span
                      className="mt-3 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--color-vermillion)]"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`index-num text-3xl md:text-4xl ${
                      item.anchor
                        ? "text-[var(--color-vermillion)]"
                        : "text-ink-faint group-hover:text-ink"
                    }`}
                  >
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 className="display-lg text-ink">{item.title}</h3>
                  <p className="mt-1 font-mono text-sm text-ink-soft">
                    {item.place}
                  </p>
                  <p className="mt-4 max-w-[60ch] text-ink-soft">{item.body}</p>
                  <span
                    className={`mt-5 inline-block chip-ink ${
                      item.anchor
                        ? "border-[var(--color-vermillion)] text-[var(--color-vermillion)]"
                        : ""
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
