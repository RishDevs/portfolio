"use client"

import Link from "next/link"
import { nav, site, socials } from "@/lib/site"
import { MagneticButton } from "@/components/MagneticButton"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="wrap pt-20 pb-10">
        <p className="label mb-8">Let&apos;s build</p>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-xl max-w-[14ch]">
            Building reliable AI systems is the work I want to do.
          </h2>
          <MagneticButton
            href={`mailto:${site.email}`}
            external
            className="btn btn-primary shrink-0"
          >
            Email Me <span aria-hidden>↗</span>
          </MagneticButton>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-[var(--color-line)] pt-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="label-sm mb-4 text-faint">Sitemap</p>
            <ul className="flex flex-col gap-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="link-underline text-sm text-muted hover:text-text"
                    data-cursor
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-sm mb-4 text-faint">Channels</p>
            <ul className="flex flex-col gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-muted hover:text-text"
                    data-cursor
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resumePath}
                  download
                  className="link-underline text-sm text-muted hover:text-text"
                  data-cursor
                >
                  Résumé (PDF) ↓
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-sm mb-4 text-faint">Now</p>
            <p className="max-w-[28ch] text-sm text-muted">
              MS Computer Science @ University at Buffalo. Open to AI/ML
              internships & research-engineering roles.
            </p>
          </div>

          <div>
            <p className="label-sm mb-4 text-faint">Direct</p>
            <a
              href={`mailto:${site.email}`}
              className="block break-words text-sm text-muted hover:text-text"
              data-cursor
            >
              {site.email}
            </a>
            <p className="mt-1 text-sm text-faint">{site.location}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-line)] pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p className="font-mono">© {year} Rishi Kolluru</p>
          <p className="font-mono">
            Designed & built with Next.js · Three.js · GSAP
          </p>
          <button
            onClick={() => {
              const l = (window as unknown as { lenis?: { scrollTo: (n: number) => void } }).lenis
              if (l) l.scrollTo(0)
              else window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="link-underline font-mono text-xs text-muted hover:text-text"
            data-cursor
          >
            Back to top ↑
          </button>
        </div>
      </div>

      {/* oversized watermark */}
      <div
        className="pointer-events-none select-none px-4 text-center font-display font-bold leading-none text-[var(--color-surface-2)]"
        style={{ fontSize: "clamp(4rem, 19vw, 18rem)", letterSpacing: "-0.05em" }}
        aria-hidden
      >
        RISHI
      </div>
    </footer>
  )
}
