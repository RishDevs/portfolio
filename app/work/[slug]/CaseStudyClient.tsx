"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { Project } from "@/lib/projects"
import { Reveal } from "@/components/Reveal"
import { MagneticButton } from "@/components/MagneticButton"

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "evaluation", label: "Evaluation" },
  { id: "failures", label: "Failure modes" },
  { id: "improved", label: "What improved" },
  { id: "takeaway", label: "Takeaway" },
]

export function CaseStudyClient({
  project,
  next,
}: {
  project: Project
  next: Project
}) {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("overview")
  const articleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const total = el.scrollHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      setProgress(total > 0 ? scrolled / total : 0)

      for (const s of [...SECTIONS].reverse()) {
        const node = document.getElementById(s.id)
        if (node && node.getBoundingClientRect().top < window.innerHeight * 0.4) {
          setActiveSection(s.id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <article ref={articleRef}>
      {/* progress bar */}
      <div className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent">
        <div
          className="h-full bg-green"
          style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
        />
      </div>

      {/* HERO */}
      <header
        id="overview"
        className="relative overflow-hidden border-b border-[var(--color-line)]"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(80% 80% at 80% 0%, rgba(109,235,255,0.18), transparent 60%), radial-gradient(70% 70% at 0% 100%, rgba(140,108,255,0.16), transparent 60%)",
          }}
        />
        <div className="wrap pt-36 pb-16 md:pt-44">
          <div className="flex items-center gap-4">
            <Link
              href="/work"
              className="link-underline font-mono text-xs uppercase tracking-widest text-muted hover:text-text"
              data-cursor
            >
              ← Work
            </Link>
            <span className="font-mono text-xs text-faint">/ {project.number}</span>
            <span className="chip border-[var(--color-line-2)] text-green">
              {project.status}
            </span>
          </div>
          <h1 className="display-hero mt-10 max-w-[15ch]">{project.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href={project.github} external className="btn btn-primary">
              View on GitHub <span aria-hidden>↗</span>
            </MagneticButton>
          </div>

          {/* metric strip */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-4">
            {project.evaluation.map((m) => (
              <div key={m.label} className="bg-[var(--color-surface)] p-6">
                <p className="display-lg text-gradient">{m.value}</p>
                <p className="label-sm mt-2 text-faint">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* BODY with sticky sidebar */}
      <div className="wrap grid gap-12 py-20 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="label-sm mb-5 text-faint">Contents</p>
            <ul className="flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`font-mono text-xs transition-colors ${
                      activeSection === s.id
                        ? "text-green"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="max-w-3xl">
          {/* PROBLEM */}
          <section id="problem" className="scroll-mt-28">
            <p className="label mb-6">Problem</p>
            <p className="text-2xl leading-relaxed text-text md:text-3xl">
              {project.problem}
            </p>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              <span className="text-green">Why it matters — </span>
              {project.whyItMatters}
            </p>
          </section>

          {/* ARCHITECTURE */}
          <section id="architecture" className="mt-24 scroll-mt-28">
            <p className="label mb-8">Architecture</p>
            <div className="flex flex-col gap-2">
              {project.architecture.map((step, i) => (
                <Reveal key={i} delay={i * 40}>
                  <div className="group flex items-center gap-4">
                    <div className="card flex w-full items-center gap-4 px-5 py-4 transition-colors group-hover:border-[var(--color-line-2)]">
                      <span className="font-mono text-xs text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm text-text md:text-base">
                        {step}
                      </span>
                    </div>
                  </div>
                  {i < project.architecture.length - 1 && (
                    <div className="ml-8 h-5 w-px bg-[var(--color-line-2)]" />
                  )}
                </Reveal>
              ))}
            </div>
          </section>

          {/* EVALUATION */}
          <section id="evaluation" className="mt-24 scroll-mt-28">
            <p className="label mb-8">Evaluation</p>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
              {project.evaluation.map((m) => (
                <div key={m.label} className="bg-[var(--color-surface)] p-6">
                  <p className="label-sm text-faint">{m.label}</p>
                  <p className="display-lg mt-2">{m.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAILURE MODES */}
          <section id="failures" className="mt-24 scroll-mt-28">
            <p className="label mb-8">Failure modes</p>
            <ul className="flex flex-col gap-4">
              {project.failureModes.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-l-2 border-[var(--color-error)] bg-[var(--color-surface)] px-5 py-4 text-muted"
                >
                  <span className="font-mono text-xs text-[var(--color-error)]">
                    !
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* IMPROVED */}
          <section id="improved" className="mt-24 scroll-mt-28">
            <p className="label mb-8">What I improved</p>
            <ul className="flex flex-col gap-4">
              {project.improvements.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-4 border-l-2 border-green bg-[var(--color-surface)] px-5 py-4 text-muted"
                >
                  <span className="font-mono text-xs text-green">↑</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* TAKEAWAY */}
          <section id="takeaway" className="mt-24 scroll-mt-28">
            <div className="card relative overflow-hidden p-8 md:p-12">
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(70% 70% at 100% 0%, rgba(184,255,61,0.12), transparent 60%)",
                }}
              />
              <p className="label relative mb-6 text-green">
                What this proves
              </p>
              <p className="relative text-2xl leading-relaxed md:text-3xl">
                {project.recruiterTakeaway}
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* NEXT */}
      <Link
        href={`/work/${next.slug}`}
        data-cursor
        className="group block border-t border-[var(--color-line)] py-20 transition-colors hover:bg-[var(--color-surface)]"
      >
        <div className="wrap">
          <p className="label mb-5 text-faint">Next project</p>
          <div className="flex items-center justify-between gap-6">
            <h2 className="display-xl max-w-[18ch] transition-colors group-hover:text-green">
              {next.title}
            </h2>
            <span className="text-3xl transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
