"use client"

import { Reveal, RevealLines } from "@/components/Reveal"

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
    <section className="section-pad relative" id="timeline">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label mb-5 text-[var(--color-magenta)]">/ 03 — The Record</p>
            <RevealLines
              className="display-xl"
              lines={["From B.Tech", "to MS, and shipping."]}
            />
          </div>
          <p className="max-w-xs label-sm leading-relaxed text-faint">
            The line begins at B.Tech ’21 and runs through MS ’25 — every entry a
            step toward building systems.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-[var(--color-line)] md:left-[8rem] md:block" />
          <div className="flex flex-col">
            {ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  className={`group relative grid gap-4 border-b border-[var(--color-line)] py-8 md:grid-cols-[8rem_1fr] md:gap-12 md:py-10 ${
                    item.anchor ? "bg-[var(--color-surface)]/40" : ""
                  }`}
                >
                  <div className="flex items-start md:justify-end md:pr-12">
                    <span
                      className={`font-mono text-2xl transition-colors md:text-3xl ${
                        item.anchor
                          ? "text-[var(--color-magenta)]"
                          : "text-faint group-hover:text-[var(--color-magenta)]"
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div className="md:pl-12">
                    <span
                      className={`absolute left-[8rem] top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--color-bg)] transition-colors md:block ${
                        item.anchor
                          ? "bg-[var(--color-magenta)]"
                          : "bg-[var(--color-line-2)] group-hover:bg-[var(--color-magenta)]"
                      }`}
                    />
                    <h3 className="display-lg">{item.title}</h3>
                    <p className="mt-1 font-mono text-sm text-[var(--color-violet)]">
                      {item.place}
                    </p>
                    <p className="mt-4 max-w-[60ch] text-muted">{item.body}</p>
                    <span
                      className={`mt-5 inline-block chip ${
                        item.anchor
                          ? "border-[var(--color-magenta)] text-[var(--color-magenta)]"
                          : "border-[var(--color-line-2)] text-muted"
                      }`}
                    >
                      ↑ {item.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
