"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const timeline = [
  {
    year: "2021",
    title: "Started B.Tech CSE",
    org: "Institute of Aeronautical Engineering",
    location: "Telangana, India",
    description: "Began computer science fundamentals — algorithms, data structures, systems programming.",
    skill: "Foundation",
    color: "#A7B0C0",
  },
  {
    year: "2023",
    title: "Software Engineering Intern",
    org: "Pullulate Private Limited",
    location: "Remote / Hyderabad",
    description:
      "Built scalable Python data pipelines, designed REST APIs for model inference, implemented data quality monitoring.",
    skill: "Data Engineering",
    color: "#6DEBFF",
  },
  {
    year: "2023",
    title: "Analytics Lead",
    org: "CETA IARE",
    location: "IARE Campus",
    description:
      "Designed automated dashboards, ran controlled experiments, documented analytical workflows.",
    skill: "Analytics",
    color: "#8C6CFF",
  },
  {
    year: "2025",
    title: "Began MS Computer Science",
    org: "University at Buffalo (SUNY)",
    location: "Buffalo, NY",
    description:
      "Focused on ML systems, retrieval, and applied AI research. Building production-grade systems from day one.",
    skill: "AI/ML Systems",
    color: "#B8FF3D",
  },
  {
    year: "2026",
    title: "Built 3 Production AI Systems",
    org: "Independent Research",
    location: "Buffalo, NY",
    description:
      "Multilingual multimodal retrieval engine (91.7% Recall@1), 6-agent delivery platform, cost-aware LLM copilot.",
    skill: "Systems Shipped",
    color: "#B8FF3D",
  },
]

export function CareerTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="py-32 px-6 max-w-7xl mx-auto">
      <p className="text-label mb-3">Career Arc</p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="text-headline mb-16"
        style={{ color: "#F5F7FA" }}
      >
        From foundations to
        <br />
        production AI systems.
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
          style={{ background: "linear-gradient(to bottom, #1A2D44, #6DEBFF, #1A2D44)" }}
        />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="relative md:pl-20"
            >
              {/* Dot */}
              <div
                className="absolute left-4 top-6 w-4 h-4 rounded-full -translate-x-1/2 hidden md:block ring-4 ring-bg"
                style={{
                  background: item.color,
                }}
              />

              <div
                className="rounded-2xl p-6 group hover:-translate-y-1 transition-transform duration-300"
                style={{ background: "#07111F", border: "1px solid #1A2D44" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </span>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                      >
                        {item.skill}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: "#F5F7FA" }}>{item.title}</h3>
                    <p className="text-sm font-mono" style={{ color: "#A7B0C0" }}>
                      {item.org} · {item.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#A7B0C0" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
