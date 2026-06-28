"use client"

import Link from "next/link"
import { useRef } from "react"
import { projects } from "@/lib/projects"
import { Reveal, RevealLines } from "@/components/Reveal"

const GRADIENTS = [
  "radial-gradient(120% 120% at 20% 20%, rgba(39,71,255,0.7), transparent 55%), radial-gradient(120% 120% at 85% 80%, rgba(255,77,46,0.4), transparent 55%)",
  "radial-gradient(120% 120% at 80% 20%, rgba(39,71,255,0.7), transparent 55%), radial-gradient(120% 120% at 20% 90%, rgba(255,77,46,0.35), transparent 55%)",
  "radial-gradient(120% 120% at 30% 80%, rgba(255,77,46,0.45), transparent 55%), radial-gradient(120% 120% at 80% 10%, rgba(39,71,255,0.7), transparent 55%)",
]

function Card({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -5
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 5
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0)"
  }

  return (
    <Reveal delay={index * 80}>
      <Link
        ref={ref}
        href={`/work/${project.slug}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group card relative block overflow-hidden p-7 transition-[transform,border-color] duration-300 will-change-transform hover:border-[var(--color-line-2)] md:p-9"
        style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}
        data-cursor
      >
        <div className="flex items-start justify-between">
          <span className="font-mono text-sm text-faint">{project.number}</span>
          <span className="chip border-[var(--color-line-2)] text-green">
            {project.mainMetric}
          </span>
        </div>

        {/* visual preview */}
        <div
          className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-line)]"
          style={{ background: "#0a0618" }}
        >
          <div
            className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: GRADIENTS[index % 3] }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <span className="absolute bottom-3 left-4 font-mono text-[0.65rem] uppercase tracking-widest text-text/70">
            {project.category}
          </span>
        </div>

        <h3 className="display-lg mt-7 max-w-[18ch] transition-colors group-hover:text-green">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors group-hover:text-text">
          Open case study
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export function FeaturedWork() {
  return (
    <section className="section-pad relative" id="work">
      <div className="wrap">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-5">/ 01 — Featured Systems</p>
            <RevealLines
              className="display-xl max-w-[20ch]"
              lines={["Selected systems built", "across retrieval, agents", "& LLM infrastructure."]}
            />
          </div>
          <Link
            href="/work"
            className="link-underline shrink-0 font-mono text-sm uppercase tracking-widest text-muted hover:text-text"
            data-cursor
          >
            All work →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Card key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
