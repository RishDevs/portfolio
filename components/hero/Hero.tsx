"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { site } from "@/lib/site"
import { MagneticButton } from "@/components/MagneticButton"
import { Scramble } from "@/components/Scramble"

const ShaderBackground = dynamic(
  () => import("./ShaderBackground").then((m) => m.ShaderBackground),
  { ssr: false }
)

const HEADLINE = [
  ["I build AI", "systems"],
  ["that", "retrieve,"],
  ["reason,", "route"],
  ["&", "ship."],
]

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden text-text">
      {/* WebGL background */}
      <div className="absolute inset-0">{mounted && <ShaderBackground />}</div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,6,10,0.6) 0%, rgba(7,6,10,0.12) 32%, rgba(7,6,10,0.72) 100%)",
        }}
      />

      {/* crop marks */}
      <span className="crop crop-tl" aria-hidden />
      <span className="crop crop-tr" aria-hidden />
      <span className="crop crop-bl" aria-hidden />
      <span className="crop crop-br" aria-hidden />

      {/* MASTHEAD */}
      <div className="wrap relative z-10 pt-24 md:pt-28">
        <div className="rule" style={{ background: "rgba(244,241,250,0.45)" }} />
        <div className="flex flex-wrap items-center justify-between gap-2 py-3">
          <span className="spec text-text">RK // AI Systems</span>
          <span className="spec flex items-center gap-2 text-[var(--color-magenta)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-magenta)]" />
            Status: Online
          </span>
          <span className="spec hidden text-muted sm:inline">
            {site.location} · MS CSE
          </span>
        </div>
        <div className="rule-faint" style={{ background: "rgba(244,241,250,0.16)" }} />
      </div>

      {/* HEADLINE */}
      <div className="wrap relative z-10 flex flex-1 flex-col justify-center py-12">
        <div className="mb-6 flex items-center gap-4">
          <span className="index-num text-sm text-[var(--color-vermillion)]">
            (01)
          </span>
          <Scramble
            text="RETRIEVAL / AGENTS / RAG INFRA / EVALUATION"
            className="spec text-muted"
          />
        </div>

        <h1 className="display-hero">
          {HEADLINE.map((line, i) => (
            <span key={i} className="reveal-line overflow-hidden">
              <span
                className="block"
                style={{
                  transform: "translateY(110%)",
                  animation: `heroLine 1s cubic-bezier(0.16,1,0.3,1) ${
                    0.3 + i * 0.1
                  }s forwards`,
                }}
              >
                {line[0]}{" "}
                {i === 1 || i === 2 ? (
                  <span className="text-gradient">{line[1]}</span>
                ) : (
                  line[1]
                )}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="max-w-xl text-[1.05rem] leading-relaxed text-muted opacity-0"
            style={{ animation: "fadeUp 1s ease 0.85s forwards" }}
          >
            {site.subtitle}
          </p>
          <div
            className="flex flex-wrap items-center gap-3 opacity-0"
            style={{ animation: "fadeUp 1s ease 1s forwards" }}
          >
            <MagneticButton href="/work" className="btn btn-primary">
              Explore Work <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="/resume" className="btn btn-ghost">
              View Résumé
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* VINTAGE FOOTER TICKER */}
      <div className="wrap relative z-10 pb-8">
        <div className="rule-faint" style={{ background: "rgba(245,247,250,0.18)" }} />
        <div className="flex items-center justify-between gap-4 py-3">
          <span className="spec text-muted">
            Est. 2021 · B.Tech IARE → 2025 · MS Buffalo
          </span>
          <span className="spec hidden text-text md:inline">
            Open to full-time AI/ML roles
          </span>
          <span className="spec flex items-center gap-2 text-[var(--color-lime)]">
            Scroll <span aria-hidden>↓</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes heroLine { to { transform: translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(20px);} to { opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce) {
          [style*="heroLine"], [style*="fadeUp"] { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  )
}
