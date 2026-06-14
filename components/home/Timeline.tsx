"use client"

import { Reveal, RevealLines } from "@/components/Reveal"

type Item = {
  year: string
  title: string
  place: string
  body: string
  skill: string
}

const ITEMS: Item[] = [
  {
    year: "2021",
    title: "B.Tech CSE begins",
    place: "Institute of Aeronautical Engineering (IARE)",
    body: "Started Computer Science & Engineering — foundations in algorithms, systems, and the math behind ML.",
    skill: "Foundations unlocked",
  },
  {
    year: "2023",
    title: "Software Engineering Intern",
    place: "Pullulate Pvt. Ltd. — Data & ML Focus",
    body: "Built scalable Python data ingestion + validation pipelines and REST APIs exposing model inference and evaluation metrics.",
    skill: "Data engineering · REST APIs",
  },
  {
    year: "2023",
    title: "Analytics Lead, CETA",
    place: "IARE Campus",
    body: "Designed automated dashboards and reproducible analysis pipelines; ran controlled experiments to measure uplift.",
    skill: "Experimentation · Analytics",
  },
  {
    year: "2025",
    title: "MS Computer Science begins",
    place: "University at Buffalo (SUNY)",
    body: "Began graduate study in CSE — deepening representation learning, retrieval, and LLM systems.",
    skill: "Research engineering",
  },
  {
    year: "2026",
    title: "Three production-grade systems",
    place: "Retrieval · Agents · RAG",
    body: "Shipped a multimodal retrieval engine, a 6-agent delivery platform, and a cost-aware LLM copilot.",
    skill: "AI systems builder",
  },
]

export function Timeline() {
  return (
    <section className="section-pad relative" id="timeline">
      <div className="wrap">
        <div className="mb-16 max-w-3xl">
          <p className="label mb-5">/ 03 — Progression</p>
          <RevealLines
            className="display-xl"
            lines={["From foundations", "to shipping systems."]}
          />
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-[var(--color-line)] md:left-[8rem] md:block" />
          <div className="flex flex-col">
            {ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group relative grid gap-4 border-b border-[var(--color-line)] py-8 md:grid-cols-[8rem_1fr] md:gap-12 md:py-10">
                  <div className="flex items-start md:justify-end md:pr-12">
                    <span className="font-mono text-2xl text-faint transition-colors group-hover:text-green md:text-3xl">
                      {item.year}
                    </span>
                  </div>
                  <div className="md:pl-12">
                    <span className="absolute left-[8rem] top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-line-2)] transition-colors group-hover:bg-green md:block" />
                    <h3 className="display-lg">{item.title}</h3>
                    <p className="mt-1 font-mono text-sm text-cyan">
                      {item.place}
                    </p>
                    <p className="mt-4 max-w-[60ch] text-muted">{item.body}</p>
                    <span className="mt-5 inline-block chip border-[var(--color-line-2)] text-green">
                      ↑ {item.skill}
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
