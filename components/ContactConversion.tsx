"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function ContactConversion() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  const links = [
    { label: "Email Me", href: "mailto:rishikolluru.work@gmail.com", primary: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/rishi-kolluru", primary: false },
    { label: "GitHub", href: "https://github.com/RishDevs", primary: false },
    { label: "Resume", href: "/resume", primary: false },
  ]

  return (
    <section ref={ref} className="py-32 px-6">
      <div
        className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
        style={{ background: "#07111F", border: "1px solid #1A2D44" }}
      >
        {/* BG glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(109,235,255,0.06) 0%, transparent 60%)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-label mb-6"
        >
          Open to Opportunities
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-headline mb-6"
          style={{ color: "#F5F7FA" }}
        >
          Building reliable AI systems is the work I want to do.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#A7B0C0" }}
        >
          I&apos;m looking for AI/ML internships, research engineering opportunities, and teams building real-world intelligent systems. If you&apos;re hiring for AI/ML, retrieval, agents, or applied research engineering, let&apos;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={
                link.primary
                  ? { background: "#B8FF3D", color: "#020A19" }
                  : { border: "1px solid #1A2D44", color: "#F5F7FA" }
              }
            >
              {link.label}
              {link.href.startsWith("http") && " ↗"}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
