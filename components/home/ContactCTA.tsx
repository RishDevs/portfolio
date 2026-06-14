"use client"

import { site } from "@/lib/site"
import { MagneticButton } from "@/components/MagneticButton"
import { RevealLines, Reveal } from "@/components/Reveal"

export function ContactCTA() {
  return (
    <section className="section-pad relative overflow-hidden" id="contact">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[140%] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(45,125,255,0.16), transparent 70%)",
        }}
      />
      <div className="wrap text-center">
        <p className="label mb-8">§ 06 — Let&apos;s talk</p>
        <RevealLines
          className="display-hero mx-auto max-w-[16ch]"
          lineClassName="mx-auto"
          lines={["Hiring for AI,", "retrieval or agents?"]}
        />
        <Reveal delay={120}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted">
            I&apos;m looking for full-time AI/ML roles, research-engineering
            positions, and teams building real-world intelligent systems. If
            that&apos;s you, let&apos;s build.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              href={`mailto:${site.email}`}
              external
              className="btn btn-primary"
            >
              Email Me <span aria-hidden>↗</span>
            </MagneticButton>
            <MagneticButton
              href={site.linkedin}
              external
              className="btn btn-ghost"
            >
              LinkedIn
            </MagneticButton>
            <MagneticButton
              href={site.github}
              external
              className="btn btn-ghost"
            >
              GitHub
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
