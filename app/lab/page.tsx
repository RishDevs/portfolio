"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { labEntries } from "@/lib/lab"

const categories = ["All", "Retrieval Experiments", "LLM Systems", "Agent Evaluations", "DL Training Runs", "ML Evaluation", "Latency Benchmarks"]
const statusColors: Record<string, string> = {
  shipped: "#B8FF3D",
  testing: "#6DEBFF",
  failed: "#FF5C7A",
  learning: "#8C6CFF",
}

export default function LabPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeStatus, setActiveStatus] = useState<string | null>(null)

  const filtered = labEntries.filter((e) => {
    if (activeCategory !== "All" && e.category !== activeCategory) return false
    if (activeStatus && e.status !== activeStatus) return false
    return true
  })

  return (
    <div className="min-h-screen pt-28 pb-32" style={{ background: "#020A19" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-4">AI Lab</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-headline mb-6"
            style={{ color: "#F5F7FA" }}
          >
            A live archive of experiments,
            <br />
            failures, and benchmarks.
          </motion.h1>
          <p className="text-base max-w-xl" style={{ color: "#A7B0C0" }}>
            The work behind the work. Not polished case studies — raw experiments, benchmark results, and honest failure analyses.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-full text-xs font-mono transition-all"
              style={
                activeCategory === cat
                  ? { background: "#6DEBFF", color: "#020A19" }
                  : { border: "1px solid #1A2D44", color: "#A7B0C0" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status filters */}
        <div className="flex gap-3 mb-12">
          {["shipped", "testing", "failed", "learning"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(activeStatus === s ? null : s)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono capitalize transition-all"
              style={{
                border: `1px solid ${activeStatus === s ? statusColors[s] : "#1A2D44"}`,
                color: activeStatus === s ? statusColors[s] : "#A7B0C0",
                background: activeStatus === s ? `${statusColors[s]}10` : "transparent",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[s] }} />
              {s}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs font-mono mb-8" style={{ color: "#A7B0C0" }}>
          Showing {filtered.length} of {labEntries.length} entries
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((entry, i) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "#07111F", border: "1px solid #1A2D44" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ color: "#A7B0C0", background: "#0D1A2E" }}
                  >
                    {entry.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[entry.status] }} />
                    <span className="text-xs font-mono capitalize" style={{ color: statusColors[entry.status] }}>
                      {entry.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm mb-2 leading-snug" style={{ color: "#F5F7FA" }}>
                  {entry.title}
                </h3>

                <p className="text-xs font-mono mb-3" style={{ color: statusColors[entry.status] }}>
                  {entry.metric}
                </p>

                <p className="text-xs leading-relaxed mb-4" style={{ color: "#A7B0C0" }}>
                  {entry.insight}
                </p>

                <p className="text-xs font-mono" style={{ color: "#1A2D44" }}>
                  {entry.date}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
