"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { labEntries } from "@/lib/lab"

const statusColors: Record<string, string> = {
  shipped: "#B8FF3D",
  testing: "#6DEBFF",
  failed: "#FF5C7A",
  learning: "#8C6CFF",
}

export function LabArchive() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })
  const [hovered, setHovered] = useState<string | null>(null)

  const featured = labEntries.slice(0, 6)

  return (
    <section ref={ref} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-16 gap-6">
        <div>
          <p className="text-label mb-3">AI Lab</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-headline"
            style={{ color: "#F5F7FA" }}
          >
            A live archive of experiments,
            <br />
            failures, and benchmarks.
          </motion.h2>
        </div>
        <div className="hidden md:block">
          <Link href="/lab" className="text-sm" style={{ color: "#6DEBFF" }}>
            All Experiments →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            onMouseEnter={() => setHovered(entry.id)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-2xl p-5 transition-all duration-300 cursor-default"
            style={{
              background: "#07111F",
              border: `1px solid ${hovered === entry.id ? statusColors[entry.status] + "50" : "#1A2D44"}`,
              transform: hovered === entry.id ? "translateY(-4px)" : "none",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ color: "#A7B0C0", background: "#0D1A2E" }}
              >
                {entry.category}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: statusColors[entry.status] }}
                />
                <span
                  className="text-xs font-mono capitalize"
                  style={{ color: statusColors[entry.status] }}
                >
                  {entry.status}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-semibold text-sm mb-2 leading-snug"
              style={{ color: "#F5F7FA" }}
            >
              {entry.title}
            </h3>

            {/* Metric */}
            <p
              className="text-xs font-mono mb-3"
              style={{ color: statusColors[entry.status] }}
            >
              {entry.metric}
            </p>

            {/* Insight */}
            <p className="text-xs leading-relaxed" style={{ color: "#A7B0C0" }}>
              {entry.insight}
            </p>

            {/* Date */}
            <p className="mt-4 text-xs font-mono" style={{ color: "#1A2D44" }}>
              {entry.date}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 md:hidden text-center">
        <Link href="/lab" className="text-sm" style={{ color: "#6DEBFF" }}>
          All Experiments →
        </Link>
      </div>
    </section>
  )
}
