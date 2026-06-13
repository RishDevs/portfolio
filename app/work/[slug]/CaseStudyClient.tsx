"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Project } from "@/lib/projects"

export function CaseStudyClient({ project, next }: { project: Project; next: Project }) {
  return (
    <div className="min-h-screen pt-24" style={{ background: "#020A19" }}>
      {/* Hero */}
      <section
        className="relative py-20 px-6 border-b"
        style={{ borderColor: "#1A2D44", background: "#07111F" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(109,235,255,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/work" className="text-sm font-mono transition-colors" style={{ color: "#A7B0C0" }}>
              ← Work
            </Link>
            <span style={{ color: "#1A2D44" }}>/</span>
            <span className="text-sm font-mono" style={{ color: "#6DEBFF" }}>
              {project.number}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "#F5F7FA" }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg mb-8"
            style={{ color: "#A7B0C0" }}
          >
            {project.tagline}
          </motion.p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {project.evaluation.map((m) => (
              <div key={m.label} className="metric-card">
                <p className="text-xs font-mono mb-1" style={{ color: "#A7B0C0" }}>
                  {m.label}
                </p>
                <p className="text-2xl font-bold" style={{ color: "#6DEBFF" }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Stack + Links */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full font-mono"
                  style={{ color: "#A7B0C0", background: "#0D1A2E", border: "1px solid #1A2D44" }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "#B8FF3D", color: "#020A19" }}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit space-y-6">
            <div className="rounded-xl p-5" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
              <p className="text-label mb-4">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: "#B8FF3D" }} />
                <span className="text-sm font-mono" style={{ color: "#B8FF3D" }}>{project.status}</span>
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
              <p className="text-label mb-4">Categories</p>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span key={c} className="text-xs font-mono px-2 py-1 rounded" style={{ color: "#6DEBFF", background: "rgba(109,235,255,0.1)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
              <p className="text-label mb-4">Key Metrics</p>
              <ul className="space-y-2">
                {project.metrics.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm font-mono" style={{ color: "#B8FF3D" }}>
                    <span style={{ color: "#1A2D44" }}>→</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problem */}
            <Section title="Problem">
              <p className="text-base leading-relaxed" style={{ color: "#A7B0C0" }}>
                {project.problem}
              </p>
            </Section>

            {/* Why it matters */}
            <Section title="Why It Matters">
              <p className="text-base leading-relaxed" style={{ color: "#A7B0C0" }}>
                {project.whyItMatters}
              </p>
            </Section>

            {/* Architecture */}
            <Section title="Architecture">
              <div className="flex flex-col gap-1">
                {project.architecture.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="rounded-xl px-4 py-3 text-sm font-mono flex-1"
                      style={{ background: "#07111F", border: "1px solid #1A2D44", color: "#F5F7FA" }}
                    >
                      {step}
                    </div>
                    {i < project.architecture.length - 1 && (
                      <span className="text-sm" style={{ color: "#1A2D44" }}>↓</span>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            {/* Failure Modes */}
            <Section title="Failure Modes">
              <ul className="space-y-3">
                {project.failureModes.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#A7B0C0" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#FF5C7A" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </Section>

            {/* What I Improved */}
            <Section title="What I Improved">
              <ul className="space-y-3">
                {project.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#A7B0C0" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#B8FF3D" }} />
                    {imp}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Recruiter Takeaway */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "linear-gradient(135deg, rgba(109,235,255,0.05), rgba(140,108,255,0.05))",
                border: "1px solid rgba(109,235,255,0.2)",
              }}
            >
              <p className="text-label mb-3" style={{ color: "#6DEBFF" }}>Recruiter Takeaway</p>
              <p className="text-base leading-relaxed" style={{ color: "#F5F7FA" }}>
                {project.recruiterTakeaway}
              </p>
            </div>
          </div>
        </div>

        {/* Next Project */}
        <div className="mt-24 pt-12 border-t" style={{ borderColor: "#1A2D44" }}>
          <p className="text-label mb-4">Next Project</p>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between p-6 rounded-2xl transition-all hover:-translate-y-1"
            style={{ background: "#07111F", border: "1px solid #1A2D44" }}
          >
            <div>
              <p className="text-xs font-mono mb-1" style={{ color: "#A7B0C0" }}>{next.number}</p>
              <h3 className="font-bold transition-colors group-hover:text-accent-cyan" style={{ color: "#F5F7FA" }}>
                {next.title}
              </h3>
              <p className="text-sm mt-1" style={{ color: "#A7B0C0" }}>{next.mainMetric}</p>
            </div>
            <span className="text-2xl transition-transform group-hover:translate-x-2" style={{ color: "#6DEBFF" }}>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-label mb-4">{title}</p>
      {children}
    </div>
  )
}
