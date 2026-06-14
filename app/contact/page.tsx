import type { Metadata } from "next"
import { PageIntro } from "@/components/PageIntro"
import { Reveal } from "@/components/Reveal"
import { MagneticButton } from "@/components/MagneticButton"
import { CopyEmail } from "@/components/CopyEmail"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rishi Kolluru — open to full-time AI/ML roles, research-engineering positions, and teams building real-world intelligent systems.",
}

const CHANNELS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "/rishi-kolluru", href: site.linkedin },
  { label: "GitHub", value: "@RishDevs", href: site.github },
  { label: "Location", value: site.location, href: undefined },
]

export default function ContactPage() {
  return (
    <>
      <PageIntro
        index="/contact"
        label="Let's build"
        titleLines={["Let's", "talk."]}
        blurb="I'm looking for full-time AI/ML roles, research-engineering positions, and teams building real-world intelligent systems. If you're hiring for retrieval, agents, or applied research engineering — let's talk."
        watermark="HELLO"
        keywords={[
          "Full-time",
          "Research engineering",
          "Buffalo, NY",
          "Open to relocate",
          "Available now",
        ]}
      />

      <section className="wrap pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* primary CTAs */}
          <Reveal>
            <div className="card flex flex-col gap-6 p-8 md:p-12">
              <p className="label text-green">Start here</p>
              <h2 className="display-lg max-w-[16ch]">
                The fastest way to reach me is email.
              </h2>
              <div className="flex flex-wrap gap-3">
                <MagneticButton
                  href={`mailto:${site.email}`}
                  external
                  className="btn btn-primary"
                >
                  Email Me ↗
                </MagneticButton>
                <CopyEmail email={site.email} />
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
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
            </div>
          </Reveal>

          {/* channels list */}
          <Reveal delay={80}>
            <div className="flex flex-col border-t border-[var(--color-line)]">
              {CHANNELS.map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    data-cursor
                    className="group flex flex-col gap-1 border-b border-[var(--color-line)] py-6 transition-colors hover:text-green sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="label-sm text-faint">{c.label}</span>
                    <span className="break-all font-mono text-sm transition-transform group-hover:-translate-x-1">
                      {c.value}{" "}
                      <span className="text-faint group-hover:text-green">↗</span>
                    </span>
                  </a>
                ) : (
                  <div
                    key={c.label}
                    className="flex flex-col gap-1 border-b border-[var(--color-line)] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="label-sm text-faint">{c.label}</span>
                    <span className="break-all font-mono text-sm text-muted">
                      {c.value}
                    </span>
                  </div>
                )
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
