"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const channels = [
  {
    label: "Email",
    value: "rishikolluru.work@gmail.com",
    href: "mailto:rishikolluru.work@gmail.com",
    desc: "Best for detailed opportunities",
    color: "#B8FF3D",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rishi-kolluru",
    href: "https://linkedin.com/in/rishi-kolluru",
    desc: "Professional profile & connections",
    color: "#6DEBFF",
  },
  {
    label: "GitHub",
    value: "github.com/RishDevs",
    href: "https://github.com/RishDevs",
    desc: "Source code & projects",
    color: "#8C6CFF",
  },
]

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    await navigator.clipboard.writeText("rishikolluru.work@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-32 flex items-center" style={{ background: "#020A19" }}>
      <div className="max-w-4xl mx-auto px-6 w-full">
        <p className="text-label mb-4">Contact</p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-headline mb-6"
          style={{ color: "#F5F7FA" }}
        >
          Building reliable AI systems is the work I want to do.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base leading-relaxed mb-16 max-w-xl"
          style={{ color: "#A7B0C0" }}
        >
          I&apos;m looking for AI/ML internships, research engineering positions, and teams building real-world intelligent systems. If you&apos;re hiring for AI/ML, retrieval, agents, or applied research engineering — let&apos;s talk.
        </motion.p>

        {/* Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {channels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
              style={{ background: "#07111F", border: `1px solid ${ch.color}30` }}
            >
              <div className="w-8 h-8 rounded-xl mb-4" style={{ background: `${ch.color}20`, border: `1px solid ${ch.color}40` }}>
                <div className="w-full h-full rounded-xl flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                </div>
              </div>
              <p className="font-bold mb-1 transition-colors" style={{ color: "#F5F7FA" }}>
                {ch.label} ↗
              </p>
              <p className="text-xs font-mono mb-2" style={{ color: ch.color }}>
                {ch.value}
              </p>
              <p className="text-xs" style={{ color: "#A7B0C0" }}>
                {ch.desc}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Copy email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ border: "1px solid #1A2D44", color: "#F5F7FA" }}
          >
            <span className="font-mono text-xs" style={{ color: "#A7B0C0" }}>
              rishikolluru.work@gmail.com
            </span>
            <span style={{ color: copied ? "#B8FF3D" : "#A7B0C0" }}>
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#B8FF3D" }} />
          <p className="text-sm font-mono" style={{ color: "#A7B0C0" }}>
            Available for AI/ML internships, research engineering, and full-time opportunities.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
