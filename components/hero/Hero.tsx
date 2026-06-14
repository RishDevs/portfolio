"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { site } from "@/lib/site"
import { MagneticButton } from "@/components/MagneticButton"

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
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // mount canvas after first paint
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      {/* WebGL background */}
      <div className="absolute inset-0">{mounted && <ShaderBackground />}</div>
      {/* legibility gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,10,25,0.55) 0%, rgba(2,10,25,0.1) 35%, rgba(2,10,25,0.5) 100%)",
        }}
      />

      {/* top meta row */}
      <div className="wrap relative z-10 flex items-center justify-between pt-28 md:pt-32">
        <p className="label hidden max-w-[16ch] leading-relaxed sm:block">
          AI Systems · Retrieval · Agents
        </p>
        <p className="label hidden text-right leading-relaxed md:block">
          {site.location}
          <br />
          MS CSE · Univ. at Buffalo
        </p>
      </div>

      {/* headline */}
      <div className="wrap relative z-10 pb-10">
        <h1 className="display-hero">
          {HEADLINE.map((line, i) => (
            <span key={i} className="reveal-line overflow-hidden">
              <span
                className="block"
                style={{
                  transform: "translateY(110%)",
                  animation: `heroLine 1s cubic-bezier(0.16,1,0.3,1) ${
                    0.35 + i * 0.12
                  }s forwards`,
                }}
              >
                {line[0]}{" "}
                {i === 1 || i === 2 ? (
                  <span className="serif-accent text-gradient">{line[1]}</span>
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
            style={{ animation: "fadeUp 1s ease 0.9s forwards" }}
          >
            {site.subtitle}
          </p>

          <div
            className="flex flex-wrap items-center gap-3 opacity-0"
            style={{ animation: "fadeUp 1s ease 1.05s forwards" }}
          >
            <MagneticButton href="/work" className="btn btn-primary">
              Explore Work
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="/resume" className="btn btn-ghost">
              View Résumé
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* bottom status bar */}
      <div className="relative z-10 border-t hairline border-t-[var(--color-line)] bg-[rgba(2,10,25,0.4)] backdrop-blur-sm">
        <div className="wrap flex items-center justify-between py-4">
          <p className="label-sm flex items-center gap-2 text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-green text-glow-green" />
            <span className="text-glow-green">Available</span> · focused on
            retrieval, agents & reliable LLM infra
          </p>
          <Link
            href="/work"
            className="label-sm hidden items-center gap-2 text-muted transition-colors hover:text-text sm:flex"
            data-cursor
          >
            Scroll <span aria-hidden>↓</span>
          </Link>
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
