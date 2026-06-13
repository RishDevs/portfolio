"use client"

import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { projects } from "@/lib/projects"

export function FeaturedWorkGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  const featured = projects.slice(0, 3)

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto" ref={ref}>
      {/* Header */}
      <div className="flex items-end justify-between mb-16 gap-6">
        <div>
          <p className="text-label mb-3">Featured Systems</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-headline"
            style={{ color: "#F5F7FA" }}
          >
            Selected systems built across
            <br />
            retrieval, agents, and LLM infrastructure.
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap"
            style={{ color: "#6DEBFF" }}
          >
            All Work →
          </Link>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <ProjectCard project={project} large={i === 0} />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 md:hidden text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "#6DEBFF" }}
        >
          View All Work →
        </Link>
      </div>
    </section>
  )
}

function ProjectCard({ project, large }: { project: typeof projects[0]; large?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
      style={{ background: "#07111F", border: "1px solid #1A2D44" }}
    >
      {/* Visual preview */}
      <div
        className="relative overflow-hidden"
        style={{ height: large ? 220 : 180 }}
      >
        {/* Abstract gradient visual */}
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
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#1A2D44 1px, transparent 1px), linear-gradient(90deg, #1A2D44 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Number */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-mono px-2 py-1 rounded"
            style={{ background: "rgba(2,10,25,0.8)", color: "#A7B0C0", border: "1px solid #1A2D44" }}
          >
            {project.number}
          </span>
        </div>
        {/* Metric badge */}
        <div className="absolute bottom-4 right-4">
          <span
            className="text-xs font-mono font-bold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(2,10,25,0.9)", color: "#B8FF3D", border: "1px solid rgba(184,255,61,0.3)" }}
          >
            {project.mainMetric}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-xs font-mono px-2 py-1 rounded"
            style={{ color: "#6DEBFF", background: "rgba(109,235,255,0.1)" }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="font-bold text-base mb-2 leading-tight transition-colors group-hover:text-accent-cyan"
          style={{ color: "#F5F7FA" }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#A7B0C0" }}>
          {project.tagline}
        </p>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ color: "#A7B0C0", background: "#0D1A2E", border: "1px solid #1A2D44" }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3" style={{ color: "#6DEBFF" }}>
          Open Case Study →
        </div>
      </div>
    </Link>
  )
}
