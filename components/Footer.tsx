"use client"

import Link from "next/link"

const links = {
  work: [
    { label: "Retrieval Engine", href: "/work/multilingual-multimodal-retrieval" },
    { label: "Agent Platform", href: "/work/ai-software-delivery-control-tower" },
    { label: "LLM Copilot", href: "/work/cost-aware-llm-support-copilot" },
  ],
  pages: [
    { label: "Systems", href: "/systems" },
    { label: "Lab", href: "/lab" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
  ],
  connect: [
    { label: "GitHub", href: "https://github.com/RishDevs" },
    { label: "LinkedIn", href: "https://linkedin.com/in/rishi-kolluru" },
    { label: "Email", href: "mailto:rishikolluru.work@gmail.com" },
  ],
}

export function Footer() {
  return (
    <footer
      className="border-t mt-32"
      style={{ borderColor: "#1A2D44", background: "#020A19" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Identity */}
          <div className="md:col-span-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-4"
              style={{ background: "linear-gradient(135deg, #6DEBFF, #B8FF3D)", color: "#020A19" }}
            >
              RK
            </div>
            <p className="font-bold text-lg mb-2" style={{ color: "#F5F7FA" }}>Rishi Kolluru</p>
            <p className="text-sm leading-relaxed" style={{ color: "#A7B0C0" }}>
              Building AI systems that retrieve, reason, route, and ship.
            </p>
            <p className="mt-4 text-xs font-mono" style={{ color: "#6DEBFF" }}>
              MS CSE · University at Buffalo
            </p>
          </div>

          {/* Work */}
          <div>
            <p className="text-label mb-4">Work</p>
            <ul className="space-y-2">
              {links.work.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "#A7B0C0" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5F7FA")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#A7B0C0")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <p className="text-label mb-4">Pages</p>
            <ul className="space-y-2">
              {links.pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "#A7B0C0" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5F7FA")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#A7B0C0")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-label mb-4">Connect</p>
            <ul className="space-y-2">
              {links.connect.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm transition-colors"
                    style={{ color: "#A7B0C0" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#6DEBFF")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#A7B0C0")}
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "#1A2D44" }}
        >
          <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>
            © 2026 Rishi Kolluru. Built with Next.js, Three.js, Framer Motion.
          </p>
          <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>
            <span style={{ color: "#B8FF3D" }}>⌘K</span> to open command menu
          </p>
        </div>
      </div>
    </footer>
  )
}
