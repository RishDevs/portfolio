"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/projects"

const categories = ["All", "Retrieval", "LLM Systems", "Agents", "Infrastructure", "Deep Learning"]

export default function WorkPage() {
  const [active, setActive] = useState("All")
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active))

  return (
    <div className="min-h-screen pt-28 pb-32" style={{ background: "#020A19" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-4">Portfolio</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-headline mb-6"
            style={{ color: "#F5F7FA" }}
          >
            Selected systems built across
            <br />
            retrieval, agents, and ML infrastructure.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base max-w-xl"
            style={{ color: "#A7B0C0" }}
          >
            Not resume bullets — case studies with architecture, metrics, failure modes, and lessons.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                active === cat
                  ? { background: "#B8FF3D", color: "#020A19" }
                  : { border: "1px solid #1A2D44", color: "#A7B0C0" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full"
                  style={{ background: "#07111F", border: "1px solid #1A2D44" }}
                >
                  {/* Preview */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `radial-gradient(ellipse at 30% 50%, ${
                          project.number === "01"
                            ? "rgba(109,235,255,0.15)"
                            : project.number === "02"
                            ? "rgba(140,108,255,0.15)"
                            : "rgba(184,255,61,0.12)"
                        } 0%, transparent 70%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: "linear-gradient(#1A2D44 1px, transparent 1px), linear-gradient(90deg, #1A2D44 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(2,10,25,0.8)", color: "#A7B0C0", border: "1px solid #1A2D44" }}>
                        {project.number}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(2,10,25,0.9)", color: "#B8FF3D", border: "1px solid rgba(184,255,61,0.3)" }}>
                        {project.mainMetric}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.categories.map((c) => (
                        <span key={c} className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: "#6DEBFF", background: "rgba(109,235,255,0.1)" }}>
                          {c}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold mb-2 transition-colors group-hover:text-accent-cyan" style={{ color: "#F5F7FA" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#A7B0C0" }}>{project.tagline}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded font-mono" style={{ color: "#A7B0C0", background: "#0D1A2E", border: "1px solid #1A2D44" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm font-medium transition-colors" style={{ color: "#6DEBFF" }}>
                      Open Case Study →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
