"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

export function DualModeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <section ref={ref} className="px-6 max-w-7xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* On Systems */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="group relative rounded-2xl overflow-hidden cursor-pointer p-10 flex flex-col justify-between min-h-[320px]"
          style={{ background: "#07111F", border: "1px solid #1A2D44" }}
        >
          {/* Glow bg */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top left, rgba(109,235,255,0.08) 0%, transparent 60%)" }}
          />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: "#6DEBFF" }} />
              <span className="text-label">ON SYSTEMS</span>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#F5F7FA" }}>
              Production-grade AI engineering
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "#A7B0C0" }}>
              Retrieval, agents, APIs, latency tracking, guardrails — systems built to ship and evaluated rigorously.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-4"
              style={{ color: "#6DEBFF" }}
            >
              View Projects →
            </Link>
          </div>
        </motion.div>

        {/* Off Systems */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="group relative rounded-2xl overflow-hidden cursor-pointer p-10 flex flex-col justify-between min-h-[320px]"
          style={{ background: "#07111F", border: "1px solid #1A2D44" }}
        >
          {/* Glow bg */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(140,108,255,0.08) 0%, transparent 60%)" }}
          />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: "#8C6CFF" }} />
              <span className="text-label" style={{ color: "#8C6CFF" }}>OFF SYSTEMS</span>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#F5F7FA" }}>
              Learning in public
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "#A7B0C0" }}>
              Research notes, experiment reports, failure analyses, benchmarks — the work behind the work.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-4"
              style={{ color: "#8C6CFF" }}
            >
              Explore Lab →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
